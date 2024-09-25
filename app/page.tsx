'use client'

import Chat from '@/components/chat'
import SideView from '@/components/side-view'
import NavBar from '@/components/navbar'

import { AuthViewType, useAuth } from '@/lib/auth'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { ChatMessage, toAISDKMessages } from '@/lib/messages'
import { experimental_useObject as useObject } from 'ai/react'
import {ArtifactSchema, artifactSchema } from '@/lib/schema'
import { usePostHog } from 'posthog-js/react'
import { supabase } from '@/lib/supabase'
import { AuthDialog } from '@/components/auth-dialog'
import { ExecutionResult } from './api/sandbox/route'

export default function Home() {
  const posthog = usePostHog()
  const [currentTab, setCurrentTab] = useState<'code' | 'artifact'>('code')
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const [artifact, setArtifact] = useState<Partial<ArtifactSchema> | undefined>()
  const [authView, setAuthView] = useState<AuthViewType>('sign_in')
  const [isAuthDialogOpen, setAuthDialog] = useState(false)
  const { session, apiKey } = useAuth(setAuthDialog, setAuthView)
  const [result, setResult] = useState<ExecutionResult>()

  const { object, submit, isLoading, stop } = useObject({
    api: '/api/chat',
    schema: artifactSchema,
    onFinish: async ({ object: artifact, error }) => {
      if (error) {
        return
      }

      const response = await fetch('/api/convertd', {
        method: 'POST',
        body: JSON.stringify({
          artifact
        })
      })

      const result = await response.json()
      setResult(result)
      setCurrentTab('artifact')
      setIsPreviewLoading(false)
    }
  })

  useEffect(() => {
    if (object) {
      setArtifact(object as ArtifactSchema)
      const lastAssistantMessage = messages.findLast(message => message.role === 'assistant')
      if (lastAssistantMessage) {
        lastAssistantMessage.content = [{ type: 'text', text: object.commentary || '' }, { type: 'code', text: object.code || '' }]
        lastAssistantMessage.meta = {
          title: object.title,
          description: object.description
        }
      }
    }
  }, [object])

  
  const logout = () => {
    supabase.auth.signOut()
  }

  const [chatInput, setChatInput] = useLocalStorage('chat', '')
  const handleSaveInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value)
  }

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const addMessage = (message: ChatMessage) => {
    setMessages(previousMessages => [...previousMessages, message])
    return [...messages, message]
  }
  const handleSubmitAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!session) {
      return setAuthDialog(true)
    }

    if (isLoading) {
      stop()
    }

    const content: ChatMessage['content'] = [{ type: 'text', text: chatInput }]

    submit({
      userID: session?.user?.id,
      messages: toAISDKMessages(addMessage({role: 'user', content})),
    })

    addMessage({
      role: 'assistant',
      content: [{ type: 'text', text: 'Generating RevealJS ppt...' }],
    })

    setChatInput('')
    setCurrentTab('code')
    setIsPreviewLoading(true)

    posthog.capture('chat_submit')
  }

  return (
    <main className="flex min-h-screen max-h-screen">
      {
        supabase && <AuthDialog open={isAuthDialogOpen} setOpen={setAuthDialog} view={authView} supabase={supabase} />
      }
      <NavBar
        session={session}
        showLogin={() => setAuthDialog(true)}
        signOut={logout}
      />

      <div className="flex-1 flex space-x-8 w-full pt-16 pb-8 px-4">
        <Chat
           isLoading={isLoading}
           handleSubmit={handleSubmitAuth}
           input={chatInput}
           handleInputChange={handleSaveInputChange}
           messages={messages}
        />
        <SideView
          isLoading={isPreviewLoading}
          selectedTab={currentTab}
          onSelectedTabChange={setCurrentTab}
          result={result}
          artifact={artifact}
        />
      </div>
    </main>
  )
}

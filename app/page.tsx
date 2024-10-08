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
import { PriceDialog } from '@/components/price-dialog'
import { toast } from 'react-toastify'

export default function Home() {
  const posthog = usePostHog()
  const [currentTab, setCurrentTab] = useState<'code' | 'artifact'>('code')
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const [artifact, setArtifact] = useState<Partial<ArtifactSchema> | undefined>()
  const [authView, setAuthView] = useState<AuthViewType>('sign_in')
  const [isAuthDialogOpen, setAuthDialog] = useState(false)
  const [isPriceDialogOpen, setPriceDialogOpen] = useState(false)
  const { session, apiKey } = useAuth(setAuthDialog, setAuthView)

  const { object, submit, isLoading, stop } = useObject({
    api: '/api/chat',
    schema: artifactSchema,
    onFinish: async ({ object: artifact, error }) => {
      if (error) {
        return
      }
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

  const checkLimit = async (): Promise<boolean> => {
    const res = await fetch('/api/limit', {
      method: 'GET',
    });

    if (res.status === 429) {
      toast.error('You have reached your request limit for the day')
      return true
    }

    return false
  }

  const [chatInput, setChatInput] = useLocalStorage('chat', '')
  const handleSaveInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setChatInput(e.target.value)
  }

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const addMessage = (message: ChatMessage) => {
    setMessages(previousMessages => [...previousMessages, message])
    return [...messages, message]
  }
  const handleSubmitAuth = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()

    if (!session) {
      return setAuthDialog(true)
    }


    if (isLoading) {
      stop()
    }

    const limited = await checkLimit()
    if (limited) {
      return
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
      {<>
        <AuthDialog open={isAuthDialogOpen} setOpen={setAuthDialog} view={authView} supabase={supabase} />
        <PriceDialog open={isPriceDialogOpen} setOpen={setPriceDialogOpen}></PriceDialog>
      </>
      }
      <NavBar
        session={session}
        showLogin={() => setAuthDialog(true)}
        signOut={logout}
        showPrice={() => setPriceDialogOpen(true)}
      />

      <div className="flex-1 flex space-x-8 w-full pt-16 pb-8 px-4">
        <Chat
           isLoading={isLoading}
           handleSubmit={handleSubmitAuth}
           input={chatInput}
           setChatInput={setChatInput}
           handleInputChange={handleSaveInputChange}
           messages={messages}
        />
        <SideView
          isLoading={isPreviewLoading}
          selectedTab={currentTab}
          onSelectedTabChange={setCurrentTab}
          artifact={artifact}
        />
      </div>
    </main>
  )
}

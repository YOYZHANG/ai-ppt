'use client'

import Chat from '@/components/chat'
import SideView from '@/components/side-view'
import NavBar from '@/components/navbar'

// import { AuthViewType, useAuth } from '@/lib/auth'
import { useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { ChatMessage, toAISDKMessages } from '@/lib/messages'
import { experimental_useObject as useObject } from 'ai/react'
import {artifactSchema } from '@/lib/schema'
import { usePostHog } from 'posthog-js/react'
// import { supabase } from '@/lib/supabase'

export default function Home() {
  const posthog = usePostHog()
  const { submit, isLoading, stop } = useObject({
    api: '/api/chat',
    schema: artifactSchema,
    onFinish: async ({ object: artifact, error }) => {
      if (error) {
        return
      }
      
      console.log('artifact', artifact)

      // setCurrentTab('artifact')
      // setIsPreviewLoading(false)
    }
  })

  const [isAuthDialogOpen, setAuthDialog] = useState(false)
  // const { session } = useAuth(setAuthDialog, setAuthView)
  const logout = () => {
    // supabase.auth.signOut()
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

    // if (!session) {
    //   return setAuthDialog(true)
    // }

    if (isLoading) {
      stop()
    }

    const content: ChatMessage['content'] = [{ type: 'text', text: chatInput }]
    submit({
      // userID: session?.user?.id,
      messages: toAISDKMessages(addMessage({role: 'user', content})),
    })

    addMessage({
      role: 'assistant',
      content: [{ type: 'text', text: 'Generating slidev ppt...' }],
    })

    setChatInput('')
    // setCurrentTab('code')
    // setIsPreviewLoading(true)

    posthog.capture('chat_submit')
  }

  return (
    <main className="flex min-h-screen max-h-screen">
      <NavBar
        session={null}
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
          isLoading={false}
          selectedTab={"markdown"}
          onSelectedTabChange={() => {}}
          result={"test"}
          artifact={{markdown: "artifact"}}
        />
      </div>
    </main>
  )
}

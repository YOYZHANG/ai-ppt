'use client'

import Chat from '@/components/chat'
import SideView from '@/components/side-view'
import NavBar from '@/components/navbar'

// import { AuthViewType, useAuth } from '@/lib/auth'
import { useState } from 'react'
// import { supabase } from '@/lib/supabase'

export default function Home() {
  const logout = () => {
    // supabase.auth.signOut()
  }

  const [isAuthDialogOpen, setAuthDialog] = useState(false)
  // const { session } = useAuth(setAuthDialog, setAuthView)
  return (
    <main className="flex min-h-screen max-h-screen">
      <NavBar
        session={null}
        showLogin={() => setAuthDialog(true)}
        signOut={logout}
      />

      <div className="flex-1 flex space-x-8 w-full pt-16 pb-8 px-4">
        <Chat
           isLoading={false}
           handleSubmit={() => {}}
           input={""}
           handleInputChange={() => {}}
           messages={[]}
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

import { Chat } from '@/components/chat'
import { SideView } from '@/components/side-view'
import NavBar from '@/components/navbar'

export default function Home() {
  return (
    <main className="flex min-h-screen max-h-screen">
      <NavBar
        apiKeyConfigurable={!process.env.NEXT_PUBLIC_NO_API_KEY_INPUT}
        baseURLConfigurable={!process.env.NEXT_PUBLIC_NO_BASE_URL_INPUT}
      />

      <div className="flex-1 flex space-x-8 w-full pt-36 pb-8 px-4">
        <Chat
        />
        <SideView
        />
      </div>
    </main>
  )
}

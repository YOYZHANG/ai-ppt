import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import { Session } from '@supabase/supabase-js'

interface NavBarProps {
  session: Session | null
  showLogin: () => void,
  signOut: () => void,
}

export default function NavBar({session, signOut, showLogin}: NavBarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-background">
      <div className="flex px-4 py-2">
        <div className="flex flex-1 items-center">
          <Link href="/" className="flex items-center gap-2" target="_blank">
            <Image src="/logo.svg" alt="logo" width={30} height={30} />
            <h1 className="whitespace-pre">Slidev AI </h1>
          </Link>
        </div>
        <div className="flex justify-end space-x-4">
          <Separator orientation="vertical" />
          {session ? (
            <div className="flex items-center">
              <span className="text-sm font-medium">{session.user.email}</span>
              <Button variant="link" size="icon" onClick={signOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="default" size="icon" className="text-sm font-medium px-8 py-2" onClick={showLogin}>
              Sign in
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}

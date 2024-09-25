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
  showPrice: () => void
}

export default function NavBar({session, signOut, showLogin, showPrice}: NavBarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-background">
      <div className="flex px-4 py-2">
        <div className="flex flex-1 items-center">
          <Link href="/" className="flex items-center gap-2" target="_blank">
            <Image src="/logo.svg" alt="logo" width={24} height={24}/>
            <h1 className="whitespace-pre ml-2">RevealJS AI </h1>
          </Link>
        </div>
        <div className="flex justify-end space-x-4">
          <Button variant="ghost" className='rounded-md px-1 text-muted-foreground h-full' onClick={showPrice}>
            <img alt="credit Icon" loading="lazy" width="12" height="12" decoding="async" className="mx-2 inline-flex" src="/money-icon.webp"></img>
            <div className="bg-gradient-to-r from-[#F9E855] to-[#E99430] bg-clip-text text-xs font-bold tabular-nums text-transparent">20</div>
          </Button>
          <Button variant="secondary" className='text-[#c5f955]' onClick={showPrice}>
            <span className="flex items-center h-5 w-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.232 2.287A.75.75 0 0 1 13.75 3v6.25H19a.75.75 0 0 1 .607 1.191l-8 11a.75.75 0 0 1-1.357-.44v-6.25H5a.75.75 0 0 1-.607-1.192l8-11a.75.75 0 0 1 .839-.272Z" fill="currentColor"></path></svg>
            </span>
            <span>Get Gredits</span>
          </Button>
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

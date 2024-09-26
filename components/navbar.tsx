import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Button } from './ui/button'
import { Session } from '@supabase/supabase-js'
import { User } from '@/components/user'
import { BsGithub, BsTwitterX } from "react-icons/bs";

interface NavBarProps {
  session: Session | null,
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
            <h1 className="whitespace-pre ml-2 font-bold">RevealJS AI </h1>
          </Link>
        </div>
        <div className="flex justify-end space-x-4">
          <Button variant="secondary" className='text-[#c5f955]' onClick={showPrice}>
            <span className="flex items-center h-5 w-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path fillRule="evenodd" clipRule="evenodd" d="M13.232 2.287A.75.75 0 0 1 13.75 3v6.25H19a.75.75 0 0 1 .607 1.191l-8 11a.75.75 0 0 1-1.357-.44v-6.25H5a.75.75 0 0 1-.607-1.192l8-11a.75.75 0 0 1 .839-.272Z" fill="currentColor"></path></svg>
            </span>
            <span>Subscribe to Pro</span>
          </Button>
          <Separator orientation="vertical" />
          <Button variant="ghost" className='rounded-md px-0 mx-0 text-muted-foreground h-full'>
            <a href="https://github.com/YOYZHANG/ai-ppt" target="_blank"><BsGithub className="text-sm w-5 h-5" /></a>
          </Button>
          <Button variant="ghost" className='rounded-md px-0 mx-0 text-muted-foreground h-full'>
            <a href="https://x.com/alexu19049062" target="_blank"><BsTwitterX className="text-sm w-5 h-5" /></a>
          </Button>
          <Separator orientation="vertical" />
          <User session={session} signOut={signOut} showLogin={showLogin}></User>
        </div>
      </div>
    </nav>
  )
}

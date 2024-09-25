import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from '@supabase/supabase-js'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

interface Props {
  session: Session | null,
  signOut: () => void,
  showLogin: () => void,
}

export function User({ session, signOut, showLogin }: Props) {
  return (
    <>
      {session && (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={`https://api.dicebear.com/9.x/adventurer/svg`}/>
            <AvatarFallback>{session.user.email}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-4">
          <DropdownMenuLabel className="text-center truncate">
            {session.user.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-center truncate">
            <Button variant="ghost" size="icon" className="w-full h-full text-sm font-medium" onClick={showLogin}>
              Sign Out
            </Button>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
      )}

      {!session && (
        <Button variant="secondary" size="icon" className="text-sm font-medium px-8 py-2" onClick={showLogin}>
          Sign in
        </Button>
      )}
    </>
    
  );
}

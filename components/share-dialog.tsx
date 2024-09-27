import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { ShareLink } from "./share"

export function ShareDialog({ open, setOpen, url }: { open: boolean, setOpen: (open: boolean) => void, url?: string }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle></DialogTitle>
        <ShareLink url={url}/>
      </DialogContent>
    </Dialog>
  )
}

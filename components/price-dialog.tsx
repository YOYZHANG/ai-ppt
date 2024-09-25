import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import Price from "./price"

export function PriceDialog({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle></DialogTitle>
      <DialogContent style={{'maxWidth': "800px"}}>
        <Price/>
      </DialogContent>
    </Dialog>
  )
}

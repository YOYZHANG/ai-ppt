import { ChangeEvent, FormEvent, useEffect } from 'react'
import { ArrowUp, Square, Sparkles,Terminal, BadgeDollarSign} from 'lucide-react'


import { Input } from '@/components/ui/input'
import { ChatMessage } from '@/lib/messages'
import { Button } from '@/components/ui/button'

interface ChatProps {
  isLoading: boolean,
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void,
  input: string
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
  messages: ChatMessage[]
}

export default function Chat({
  isLoading,
  input,
  messages,
  handleInputChange,
  handleSubmit,
}: ChatProps) {
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [JSON.stringify(messages)])

  return (
    <div className="flex-1 flex flex-col gap-4 max-h-full max-w-[800px] mx-auto justify-between">
      <div id="chat-container" className="flex flex-col gap-2 overflow-y-auto max-h-full px-4 rounded-lg">
        {messages.map((message: ChatMessage, index: number) => (
          <div className={`py-2 px-4 shadow-sm whitespace-pre-wrap ${message.role !== 'user' ? 'bg-white/5 border text-muted-foreground' : 'bg-white/20'} rounded-lg font-serif`} key={index}>
            {message.content.map((content, id) => {
              if (content.type === 'text') {
                return <p key={content.text} className="flex-1">{content.text}</p>
              }

              if (content.type === 'image') {
                return <img key={id} src={content.image} alt="artifact" className="mr-2 inline-block w-[50px] h-[50px] object-contain border border-[#FFE7CC] rounded-lg bg-white mt-2" />
              }
            })}
            {message.meta &&
              <div className="mt-4 flex justify-start items-start border rounded-md">
                <div className="p-2 self-stretch border-r w-14 flex items-center justify-center">
                  <Terminal strokeWidth={2} className="text-[#FF8800]"/>
                </div>
                <div className="p-2 flex flex-col space-y-1 justify-start items-start min-w-[100px]">
                  <span className="font-bold font-sans text-sm text-primary">{message.meta.title}</span>
                  <span className="font-sans text-sm">{message.meta.description}</span>
                </div>
              </div>
            }
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className='flex items-center text-center text-xs font-normal ml-3'>
            <span className='text-[#696969]'>Credit cost:   </span>
            <img alt="credit Icon" loading="lazy" width="12" height="12" decoding="async" className="ml-4 mr-1 inline-flex" src="/money-icon.webp"></img>
            <span className="mr-1 text-label-base">5</span>
            <span className='text-label-base'>credits</span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-row gap-2 items-center">
          <Input
            className="focus:outline-none"
            required={true}
            placeholder="eg: Introduce langchain.js"
            value={input}
            onChange={handleInputChange}
          />
          { !isLoading ? (
              <Button variant="secondary" size="icon" className='rounded-full h-10 w-11'>
                <Sparkles className="h-5 w-5 text-[#c5f955]" />
              </Button>
          ) : (
              <Button variant="secondary" size="icon" className='rounded-full h-10 w-11' onClick={(e) => { e.preventDefault(); stop() }}>
                <Square className="h-5 w-5 text-[#c5f955]" />
              </Button>
            )
          }
        </form>
      </div>
    </div>
  )
}

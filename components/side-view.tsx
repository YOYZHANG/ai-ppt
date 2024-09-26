import { Dispatch, SetStateAction, useState } from 'react'
import { Download, LoaderCircle, Share2, Copy } from 'lucide-react'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Button } from "@/components/ui/button"
import { CodeView } from './code-view'
import { ArtifactView } from './artifact-view'
import { ArtifactSchema } from '@/lib/schema'
import { ExecutionResult } from '@/app/api/sandbox/route'
import { toast } from 'react-toastify'

interface SideViewProps {
  isLoading:boolean,
  selectedTab: 'code' | 'artifact'
  onSelectedTabChange: Dispatch<SetStateAction<"code" | "artifact">>
  result?: ExecutionResult,
  artifact?: Partial<ArtifactSchema>
}

export default function SideView({
  isLoading,
  selectedTab,
  onSelectedTabChange,
  result,
  artifact

}: SideViewProps) {
  const [iframeKey, setIframeKey] = useState(0)

  if (!artifact) {
    return null
  }

  function share(url: string) {
    window.open(`${window.location.origin}/${url}`, '_blank', 'noopener,noreferrer');
  }

  function copy (content: string) {
    navigator.clipboard.writeText(content)
      .then(() => {
        toast('Copied to clipboard')
      })
      .catch(err => {
        toast.error('Failed to copy: ' + content)
      })
  }

  function download (content: string) {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = "revealjs.html"
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  return (
    <div className="flex-1 flex flex-col shadow-2xl rounded-lg border max-w-[800px] bg-popover">
      <Tabs
        value={selectedTab}
        onValueChange={(value) => onSelectedTabChange(value as 'code' | 'artifact')}
        className="h-full max-h-full overflow-hidden flex flex-col items-start justify-start"
      >
        <div className="w-full p-2 grid grid-cols-3 items-center justify-end rounded-t-lg border-b">
          <div className='flex justify-start'>
            {isLoading && <LoaderCircle className="h-4 w-4 text-[#a1a1aa] animate-spin" />}
          </div>

          <div className='flex justify-center'>
            <TabsList className="px-1 py-0 border h-8">
              <TabsTrigger className="font-normal text-xs py-1 px-2" value="code">code</TabsTrigger>
              <TabsTrigger disabled={!result} className="font-normal text-xs py-1 px-2" value="artifact">Preview</TabsTrigger>
            </TabsList>
          </div>
          <div className='flex items-center justify-end space-x-2'>
          {
            result && (
              <>
                <Button variant="ghost" className='h-8 rounded-md px-3 text-muted-foreground' title='Download Artifact' onClick={() => download(artifact.code || '')}>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" className='h-8 rounded-md px-3 text-muted-foreground' title='Copy URL' onClick={() => copy(artifact.code || '')}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" className='h-8 rounded-md px-3 text-muted-foreground' title='Share' onClick={() => share(result.url)}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </>
            )
          }
          </div>
        </div>

        <div className="w-full flex-1 flex flex-col items-start justify-start overflow-y-auto">
          {artifact && (
            <>
              <TabsContent value="code" className="flex-1 w-full">
                {artifact.code &&
                  <CodeView content={artifact.code}/>
                }
              </TabsContent>
              <TabsContent value="artifact" className="flex-1 w-full flex flex-col items-start justify-start">
                {result &&
                  <ArtifactView
                    iframeKey={iframeKey}
                    result={result}
                  />
                }
              </TabsContent>
            </>
          )}
        </div>
      </Tabs>
    </div>
  )
}

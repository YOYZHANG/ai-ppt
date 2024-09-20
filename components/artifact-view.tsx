'use client'

import { ExecutionResult } from "@/app/api/sandbox/route"

interface ArtifactViewProps {
  iframeKey: number
  result: ExecutionResult
}


export function ArtifactView({
  iframeKey,
  result,
}: ArtifactViewProps) {
  if (!result) return null

  return (
    <div className="w-full h-full">
      <iframe
        key={iframeKey}
        className="h-full w-full"
        sandbox="allow-forms allow-scripts allow-same-origin"
        loading="lazy"
        src={result.url}
      />
    </div>
  )
}

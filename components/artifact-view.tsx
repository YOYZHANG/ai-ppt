'use client'

import { useEffect, useState } from "react"

interface ArtifactViewProps {
  result: string
}


export function ArtifactView({
  result,
}: ArtifactViewProps) {

  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    setIframeKey(prevKey => prevKey + 1);
  }, [result]);

  if (!result) return null

  const encodedHTML = encodeURIComponent(result);
  const dataURI = `data:text/html;charset=utf-8,${encodedHTML}`;

  return (
    <div className="w-full h-full">
      <iframe
        key={iframeKey}
        className="h-full w-full"
        sandbox="allow-forms allow-scripts allow-same-origin"
        loading="lazy"
        src= {dataURI}
      />
    </div>
  )
}

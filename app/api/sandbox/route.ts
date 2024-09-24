import { ArtifactSchema } from '@/lib/schema'
import { Sandbox, Result } from "@e2b/code-interpreter";

const sandboxTimeout = 10 * 60 * 1000 // 10 minute in ms
// const templateId = 'toyw6mhmdw42n4wyhdcb'
const templateId = 'my-slidev-developer'
const filePath = '/home/user/slidev/slides.md'

export const maxDuration = 60


export type ExecutionResult = {
  url: string
}

export async function POST(req: Request) {
  console.log('in /api/sandbox')
  const { artifact, userID, apiKey }: { artifact: ArtifactSchema, userID: string, apiKey: string } = await req.json()
  console.log('artifact', artifact)
  console.log('userID', userID)
  console.log('apiKey', apiKey)

  const sbx =  await Sandbox.create(templateId, { metadata: { template: templateId, userID: userID }, timeoutMs: sandboxTimeout, apiKey })
  console.log('Created sandbox', sbx.sandboxID)
  console.log('Created sandbox', sbx)
  // if (artifact.markdown) {
  //   await sbx.files.write(filePath, artifact.markdown)
  //   console.log(`Copied file`)
  // }
  console.log(JSON.stringify({
    url: `https://${sbx?.getHost(3030)}`
  }))

  return new Response(JSON.stringify({
    url: `https://${sbx?.getHost(3030)}`
  }))
  
}

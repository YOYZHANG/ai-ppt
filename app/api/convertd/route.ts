import { supabase } from '@/lib/supabase';

async function uploadFileContent(fileContent: string, fileName: string) {
  const { data, error } = await supabase.storage
    .from('ppt')
    .upload(`public/${fileName}`, fileContent, {
      contentType: 'text/html',
    })

  if (error) {
    console.error('covert file failed', error)
    return null
  }

  const { publicUrl } = supabase.storage.from('ppt').getPublicUrl(data.path).data
  
  return publicUrl
}

export async function POST(req: Request) {
  const { artifact} = await req.json()
  const url = await uploadFileContent(artifact.code, `ppt_${Date.now()}.html`)

  if (!url) {
      return new Response('upload ppt html failed.', {
        status: 403
      })
  }

  // Send file URL back to client
  return new Response(JSON.stringify({
    url
  }))
}

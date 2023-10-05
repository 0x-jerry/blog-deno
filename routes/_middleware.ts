// routes/_middleware.ts
import { MiddlewareHandlerContext } from '$fresh/server.ts'
import { fromFileUrl } from '$std/path/from_file_url.ts'
import { i18nConf } from '../lib/i18n.ts'

interface State {
  data: string
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>
) {
  const u = new URL(req.url)

  const lng = u.searchParams.get('lng')
  i18nConf.lng = lng || i18nConf.lng

  const resp = (await handleImage(u)) || (await ctx.next())

  return resp
}

async function handleImage(u: URL) {
  const imageReg = /\.(png|jpg|jpeg|webp)$/

  // if is a image
  if (u.pathname.startsWith('/posts/') && imageReg.test(u.pathname)) {
    const relativePath = u.pathname.slice(1)
    const ext = u.pathname.split('.').pop()
    const buf = await readPostImage(relativePath)

    return new Response(buf, {
      headers: {
        'content-type': `image/${ext}`
      }
    })
  }
}

async function readPostImage(relativePath: string) {
  const p = fromFileUrl(import.meta.resolve('../docs/' + relativePath))
  const buf = await Deno.readFile(p)
  return buf
}

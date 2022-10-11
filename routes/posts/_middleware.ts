// routes/_middleware.ts
import { MiddlewareHandlerContext } from '$fresh/server.ts'
import * as path from 'https://deno.land/std@0.159.0/path/mod.ts'

interface State {
  data: string
}

const isResources = /\.(png|jpe?g|webp|avif)$/

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>
) {
  const u = new URL(req.url)

  if (isResources.test(u.pathname)) {
    const file = import.meta.resolve('../../docs' + u.pathname)

    try {
      const r = await Deno.readFile(path.fromFileUrl(file))

      const res = new Response(r)

      res.headers.set('cache-control', ' max-age=604800')
      return res
    } catch (_error) {
      // console.log(file, error)
    }
  }

  const resp = await ctx.next()

  return resp
}

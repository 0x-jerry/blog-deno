// routes/_middleware.ts
import { MiddlewareHandlerContext } from '$fresh/server.ts'
import * as path from '$std/path/mod.ts'

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

      return new Response(r, {
        headers: {
          'cache-control': 'public, max-age=604800, immutable'
        }
      })
    } catch (_error) {
      // console.log(file, error)
    }
  }

  const resp = await ctx.next()

  return resp
}

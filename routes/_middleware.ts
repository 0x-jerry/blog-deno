// routes/_middleware.ts
import { MiddlewareHandlerContext } from '$fresh/server.ts'
import { i18nConf } from '../lib/i18n.ts'

interface State {
  data: string
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>
) {
  const lng = new URL(req.url).searchParams.get('lng')
  i18nConf.lng = lng || i18nConf.lng

  const resp = await ctx.next()

  return resp
}

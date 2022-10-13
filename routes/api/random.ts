import { Handlers } from '$fresh/server.ts'

export const handler: Handlers = {
  GET(_, _ctx) {
    const seed = Math.random().toString(16).slice(2)

    return new Response(null, {
      status: 302,
      headers: {
        location: 'https://api.0x-jerry.icu/img/random?id=' + seed
      }
    })
  }
}

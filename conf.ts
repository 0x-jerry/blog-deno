import { fromFileUrl } from '$std/path/mod.ts'
import { render } from './lib/markdown.ts'

export const config = {
  name: '0x-Jerry',
  avatar: 'https://avatars.githubusercontent.com/u/14226737?v=4',
  motto: `Life was like a box of chocolates. You never know what you're gonna get.`,
  email: 'x.jerry.wang@gmail.com',
  links: {
    github: 'https://github.com/0x-jerry'
  },
  about: await render(fromFileUrl(import.meta.resolve('./docs/about.md')))
}

import { Head } from '$fresh/runtime.ts'
import { Handlers, PageProps } from '$fresh/server.ts'
import { fromFileUrl } from 'https://deno.land/std@0.150.0/path/mod.ts'
import ChangeLng from '../islands/ChangeLng.tsx'
import { t } from '../lib/i18n.ts'

interface PageData {
  list: string[]
}

export const handler: Handlers<PageData> = {
  async GET(_, ctx) {
    const files = Deno.readDir(
      fromFileUrl(import.meta.resolve('../docs/posts'))
    )

    const list: string[] = []

    for await (const file of files) {
      if (file.isFile && file.name.endsWith('.md')) {
        list.push(file.name.slice(0, -'.md'.length))
      }
    }

    return ctx.render({ list })
  }
}

export default function Home({ data }: PageProps<PageData>) {
  return (
    <>
      <Head>
        <title>Fresh App</title>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.min.css'
          integrity='sha512-KUoB3bZ1XRBYj1QcH4BHCQjurAZnCO3WdrswyLDtp7BMwCw7dPZngSLqILf68SGgvnWHTD5pPaYrXi6wiRJ65g=='
          crossorigin='anonymous'
          referrerpolicy='no-referrer'
        />
      </Head>
      <div class='markdown-body px-20'>
        <div>
          <ChangeLng />
        </div>

        <div>{t('title.index', { name: '0x-jerry' })}</div>
        <div>
          <ul>
            {data.list.map((title) => (
              <li>
                <a href={`posts/${title}`}>{title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

import { Head } from '$fresh/runtime.ts'
import { Handlers, PageProps } from '$fresh/server.ts'
import ChangeLng from '../../islands/ChangeLng.tsx'
import { t } from '../../lib/i18n.ts'
import { render } from '../../lib/markdown.ts'

interface PageData {
  markdown: string
}

export const handler: Handlers<PageData> = {
  async GET(req, ctx) {
    const filename = new URL(req.url).pathname

    const markdown = await render(`${filename}.md`)

    return ctx.render({ markdown })
  }
}

export default function Post({ data }: PageProps<PageData>) {
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
      <div class="px-20">
        <div>
          <ChangeLng />
        </div>

        <div>{t('title.index', { name: '0x-jerry' })}</div>

        <div
          class='markdown-body'
          dangerouslySetInnerHTML={{ __html: data.markdown }}
        ></div>
      </div>
    </>
  )
}

import { Head } from '$fresh/runtime.ts'
import { Handlers, PageProps } from '$fresh/server.ts'
import { fromFileUrl, join } from '$std/path/mod.ts'
import { DefaultLayout } from '../components/Layout.tsx'
import { config } from '../conf.ts'
import { t } from '../lib/i18n.ts'
import { frontMatter } from '../lib/markdown.ts'
import { PostMatter } from '../types/index.ts'
import dayjs from "dayjs"
import { Tag } from '../components/Tag.tsx'
import { Link } from '../components/Link.tsx'

interface PostItem {
  path: string
  data: PostMatter
}

interface PageData {
  list: PostItem[]
}

export const handler: Handlers<PageData> = {
  async GET(_, ctx) {
    const folder = fromFileUrl(import.meta.resolve('../docs/posts'))

    const files = Deno.readDir(folder)

    let list: PostItem[] = []

    for await (const file of files) {
      if (file.isFile && file.name.endsWith('.md')) {
        const filePath = join(folder, file.name)
        const txt = await Deno.readTextFile(filePath)
        const matter = frontMatter<PostMatter>(txt)

        const name = file.name.slice(0, -'.md'.length)

        list.push({
          path: name,
          data: matter.attrs
        })
      }
    }

    list = list
      .filter((a) => a.data.publish !== false)
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())

    return ctx.render({ list })
  }
}

export default function Home({ data }: PageProps<PageData>) {
  const PostTitle = <div></div>

  return (
    <>
      <Head>
        <title>{t('title.index', { name: config.name })}</title>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.min.css'
          integrity='sha512-KUoB3bZ1XRBYj1QcH4BHCQjurAZnCO3WdrswyLDtp7BMwCw7dPZngSLqILf68SGgvnWHTD5pPaYrXi6wiRJ65g=='
          crossOrigin='anonymous'
          referrerpolicy='no-referrer'
        />
      </Head>

      <DefaultLayout title={t('title.index', { name: config.name })}>
        <div class='flex(& col) gap-2'>
          {data.list.map((item) => (
            <div class='flex gap-1'>
              <Link href={`posts/${item.path}`}>{item.data.title}</Link>
              {item.data.tags?.length && (
                <span class='flex gap-1 items-center'>
                  <Tag color='blue'>
                    {dayjs(item.data.date).format('YYYY-MM-DD')}
                  </Tag>

                  {item.data.tags.map((tag) => (
                    <Tag href={`/tags/${tag}`}>{tag}</Tag>
                  ))}
                </span>
              )}
            </div>
          ))}
        </div>
      </DefaultLayout>
    </>
  )
}

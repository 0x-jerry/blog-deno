import { Head } from '$fresh/runtime.ts'
import { Handlers, PageProps } from '$fresh/server.ts'
import { DefaultLayout } from '../components/Layout.tsx'
import { config } from '../conf.ts'
import { t } from '../lib/i18n.ts'
import { PostItem } from '../types/index.ts'
import dayjs from 'dayjs'
import { Tag } from '../components/Tag.tsx'
import { Link } from '../components/Link.tsx'
import { getPosts } from '../utils/posts.ts'
import PostItemLink from '../components/PostItemLink.tsx'

interface PageData {
  list: PostItem[]
}

export const handler: Handlers<PageData> = {
  async GET(_, ctx) {
    let posts = await getPosts()

    posts = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())

    return ctx.render({ list: posts })
  }
}

export default function Home({ data }: PageProps<PageData>) {
  return (
    <>
      <Head>
        <title>{t('title.index', { name: config.name })}</title>
      </Head>

      <DefaultLayout title={t('title.index', { name: config.name })}>
        <div class='flex(& col) gap-2'>
          {data.list.map((item) => (
            <PostItemLink {...item}></PostItemLink>
          ))}
        </div>
      </DefaultLayout>
    </>
  )
}

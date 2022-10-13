import { Handlers, PageProps } from '$fresh/server.ts'
import { DefaultLayout } from '../components/Layout.tsx'
import { getPosts } from '../utils/posts.ts'
import { t } from '../lib/i18n.ts'
import { config } from '../conf.ts'
import { Tag } from '../components/Tag.tsx'

interface PageData {
  tags: string[]
}

export const handler: Handlers<PageData> = {
  async GET(_, ctx) {
    const posts = await getPosts()

    const tags: string[] = []

    posts.forEach((item) => {
      tags.push(...(item.data.tags || []))
    })

    return ctx.render({
      tags: [...new Set(tags)]
    })
  }
}

export default function TagsPage({ data }: PageProps<PageData>) {
  const title = t('title.tags', { name: config.name })

  return (
    <DefaultLayout title={title} showBack>
      <div class='flex(& wrap) gap-2 justify-center'>
        {data.tags.map((item) => (
          <Tag href={`/tags/${item}`}>{item}</Tag>
        ))}
      </div>
    </DefaultLayout>
  )
}

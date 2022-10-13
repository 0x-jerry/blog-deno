import { Handlers, PageProps } from '$fresh/server.ts'
import { DefaultLayout } from '../components/Layout.tsx'
import PostItemLink from '../components/PostItemLink.tsx'
import { getPosts } from '../utils/posts.ts'
import { t } from '../lib/i18n.ts'
import { config } from '../conf.ts'
import { PostItem } from '../types/index.ts'
import dayjs from 'dayjs'

interface PageData {
  posts: PostItem[]
}

interface ArchiveMonth {
  month: number
  posts: PostItem[]
}

interface ArchiveYear {
  year: number
  months: ArchiveMonth[]
}

export const handler: Handlers<PageData> = {
  async GET(_, ctx) {
    const posts = await getPosts()

    return ctx.render({
      posts
    })
  }
}

export default function ArchivesPage({ data }: PageProps<PageData>) {
  const title = t('title.tags', { name: config.name })

  const archives: ArchiveYear[] = []

  for (const post of data.posts) {
    const date = dayjs(post.data.date)

    const year = date.year()
    const month = date.month() + 1

    let theYear = archives.find((n) => n.year === year)
    if (!theYear) {
      theYear = { year, months: [] }
      archives.push(theYear)
    }

    let theMonth = theYear.months.find((n) => n.month === month)

    if (!theMonth) {
      theMonth = { month, posts: [] }
      theYear.months.push(theMonth)
    }

    theMonth.posts.push(post)
  }

  return (
    <DefaultLayout title={title} showBack>
      <div class='flex(& col) gap-4'>
        {archives.map((yearItem) => {
          return (
            <>
              {yearItem.months.map((monthItem) => {
                return (
                  <div>
                    <h2 class='text-2xl my-2'>
                      {yearItem.year} - {monthItem.month}
                    </h2>

                    <div class='flex(& col) gap-2 pl-4'>
                      {monthItem.posts.map((item) => (
                        <PostItemLink {...item}></PostItemLink>
                      ))}
                    </div>
                  </div>
                )
              })}
            </>
          )
        })}
      </div>
    </DefaultLayout>
  )
}

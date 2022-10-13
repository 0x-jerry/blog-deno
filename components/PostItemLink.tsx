import dayjs from 'dayjs'
import { PostItem } from '../types/index.ts'
import { Link } from './Link.tsx'
import { Tag } from './Tag.tsx'
import { RenderableProps } from 'preact'

export default function PostItemLink(props: RenderableProps<PostItem>) {
  return (
    <div class='flex gap-2 items-center'>
      <Tag>{dayjs(props.data.date).format('YYYY-MM-DD')}</Tag>

      <Link href={`/posts/${props.path}`}>{props.data.title}</Link>
      {props.data.tags?.length && (
        <>
          {props.data.tags.map((tag) => (
            <Tag href={`/tags/${tag}`}>{tag}</Tag>
          ))}
        </>
      )}
    </div>
  )
}

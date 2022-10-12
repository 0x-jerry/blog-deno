import dayjs from 'dayjs'
import { PostItem } from '../types/index.ts'
import { Link } from './Link.tsx'
import { Tag } from './Tag.tsx'
import { RenderableProps } from 'preact'

export default function PostItemLink(props: RenderableProps<PostItem>) {
  return (
    <div class='flex gap-1'>
      <Link href={`/posts/${props.path}`}>{props.data.title}</Link>
      {props.data.tags?.length && (
        <span class='flex gap-1 items-center'>
          <Tag color='blue'>{dayjs(props.data.date).format('YYYY-MM-DD')}</Tag>

          {props.data.tags.map((tag) => (
            <Tag href={`/tags/${tag}`}>{tag}</Tag>
          ))}
        </span>
      )}
    </div>
  )
}

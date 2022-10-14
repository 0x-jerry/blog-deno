import dayjs from 'dayjs'
import { PostItem } from '../types/index.ts'
import { Link } from './Link.tsx'
import { Tag } from './Tag.tsx'
import { RenderableProps } from 'preact'

export default function PostItemLink(props: RenderableProps<PostItem>) {
  return (
    <div class='flex(& col) gap-2 md:flex-row'>
      <div class='flex(& wrap) gap-2 items-center' >
        <Tag>{dayjs(props.data.date).format('YYYY-MM-DD')}</Tag>
        <Link href={`/posts/${props.path}`}>{props.data.title}</Link>
      </div>
      {props.data.tags?.length && (
        <div class='flex(& wrap) gap-2 items-center border(b solid gray-100) pb-4 mb-2 md:(p-0 m-0 border-none) '>
          {props.data.tags.map((tag) => (
            <Tag href={`/tags/${tag}`}>{tag}</Tag>
          ))}
        </div>
      )}
    </div>
  )
}

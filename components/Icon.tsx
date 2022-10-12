import { JSX, RenderableProps } from 'preact'

export function Icon(
  props: RenderableProps<
    JSX.HTMLAttributes<HTMLSpanElement> & { name: string; background?: boolean }
  >
) {
  const clx = props.background ? 'bg-gray-100 p-1 rounded' : ''

  return (
    <span className={['inline-block text-lg', clx].join(' ')} {...props}>
      <span className='iconify-inline' data-icon={props.name}></span>
    </span>
  )
}

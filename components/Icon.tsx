import { JSX, RenderableProps } from 'preact'

export function Icon(
  props: RenderableProps<JSX.HTMLAttributes<HTMLSpanElement> & { name: string }>
) {
  return (
    <span className='text-lg' {...props}>
      <span className='iconify-inline' data-icon={props.name}></span>
    </span>
  )
}

import { JSX } from 'preact'

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      class={[
        'px-2 py-1 border(gray-100 1) bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center',
        props.class,
      ].join(' ')}
    />
  )
}

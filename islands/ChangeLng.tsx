import { IS_BROWSER } from '$fresh/runtime.ts'

export default function ChangeLng() {
  const change = (e: Event) => {
    const to = `/?lng=${(e.target as HTMLSelectElement)?.value}`

    history.replaceState({}, to)
    location.href = to
  }

  const value = IS_BROWSER ? (new URL(location.href).searchParams.get('lng') || 'en') : 'en'

  return (
    <select value={value} onChange={change}>
      <option value='zh'>中文</option>
      <option value='en'>english</option>
    </select>
  )
}

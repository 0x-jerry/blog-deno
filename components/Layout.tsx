import { Head } from '$fresh/runtime.ts'
import { Icon } from './Icon.tsx'
import { JSX, RenderableProps } from 'preact'
import { config } from '../conf.ts'
import dayjs from 'dayjs'
import { Link } from './Link.tsx'
import GoBack from '../islands/GoBack.tsx'

export function Sidebar(props: RenderableProps<JSX.HTMLAttributes>) {
  return (
    <div {...props} className='h-screen'>
      <div class='h-full w-8 border(r gray-100)'></div>
      <div class='h-full w-72 border(r gray-100) flex(& col) items-center pt-32 px-6 bg-gray-50'>
        <a href='/'>
          <img
            class='rounded-full w-40 transition duration-1000 rotate(0 hover:[360deg])'
            src='https://avatars.githubusercontent.com/u/14226737?v=4'
          />
        </a>
        <div class='mt-4 text-3xl'>{config.name}</div>
        <div
          class='my-2 text-gray-400 text-xs'
          dangerouslySetInnerHTML={{ __html: config.motto }}
        ></div>
        <div class='mt-2'>
          <a href={config.links.github} target='_blank'>
            <Icon name='logos:github-icon'></Icon>
          </a>
        </div>
      </div>
    </div>
  )
}

export function DefaultLayout(
  props: RenderableProps<{ title?: string | JSX.Element; showBack?: boolean }>
) {
  const renderTitle = (title?: string | JSX.Element) => {
    if (!title) return ''

    const titleEl =
      typeof title === 'string' ? (
        <h1 class='text-2xl'>{props.title}</h1>
      ) : (
        title
      )

    return (
      <>
        <div class='flex items-center gap-1'>
          {props.showBack && <GoBack class='mr-2 flex'></GoBack>}
          {titleEl}
        </div>
        <hr class='mt-2 mb-4' />
      </>
    )
  }

  return (
    <>
      <Head>
        <script src='https://code.iconify.design/3/3.0.0/iconify.min.js'></script>
      </Head>
      <div>
        <Sidebar class='hidden sm:flex fixed left-0 top-0'></Sidebar>
        <div class='ml-0 sm:ml-80 px-10 pt-3'>
          {renderTitle(props.title)}

          {props.children}

          <div class='my-6'>
            <div class='text-gray-500 text-center'>
              © 2017-{dayjs().year()} @{' '}
              <Link href={`mailto:${config.email}`}>{config.name}</Link>. Built
              top on{' '}
              <Link href='https://deno.land' target='_blank'>
                deno
              </Link>{' '}
              and{' '}
              <Link href='https://fresh.deno.dev' target='_blank'>
                fresh
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

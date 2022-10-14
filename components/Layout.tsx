import { Head, INTERNAL_PREFIX } from '$fresh/runtime.ts'
import { Icon } from './Icon.tsx'
import { JSX, RenderableProps } from 'preact'
import { config } from '../conf.ts'
import dayjs from 'dayjs'
import { Link } from './Link.tsx'
import GoBack from '../islands/GoBack.tsx'
import { Button } from './Button.tsx'
import { t } from '../lib/i18n.ts'

interface SidebarMenu {
  href: string
  icon: string
  name: string
}

export function Sidebar(props: RenderableProps<JSX.HTMLAttributes>) {
  const menus: SidebarMenu[] = [
    {
      href: '/',
      icon: 'carbon:home',
      name: t('menu.title.home')
    },
    {
      href: '/tags',
      icon: 'carbon:tag',
      name: t('menu.title.tags')
    },
    {
      href: '/archives',
      icon: 'carbon:archive',
      name: t('menu.title.archive')
    },
    {
      href: '/about',
      icon: 'carbon:presentation-file',
      name: t('menu.title.about')
    }
  ]

  return (
    <div {...props} className='h-12 lg:h-screen'>
      <div class='h-full w-8 border(r gray-100) hidden lg:block'></div>
      <div
        class='flex items-center border(b gray-100) w-full gap-2 px-4 bg-gray-50 lg:(h-full w-72 border(r gray-100) flex-col px-6 pb-10 overflow-auto)'
      >
        <a href='/' class='rounded-full overflow-hidden h-2/3 md:h-4/5 lg:(h-auto w-4/5 mt-20)'>
          <img
            class='transition duration-1000 rotate(0 hover:[360deg]) w-full h-full object-cover'
            src={config.avatar}
          />
        </a>
        <div class='text-xl whitespace-nowrap flex-1 md:flex-none lg:(text-3xl)'>{config.name}</div>
        <div
          class='hidden text-gray-400 text-xs flex(1 shrink-10) md:(block) lg:(my-2 flex-none)'
          dangerouslySetInnerHTML={{ __html: config.motto }}
        ></div>
        <div class='lg:mt-2'>
          <a href={config.links.github} target='_blank'>
            <Icon name='logos:github-icon'></Icon>
          </a>
        </div>
        <div class='flex gap-2 lg:(flex-col w-full)'>
          {menus.map((item) => (
            <a href={item.href}>
              <Button class='w-full'>
                <Icon name={item.icon} title={item.name}></Icon>
                <span class='flex-1 hidden lg:inline-block'>{item.name}</span>
              </Button>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export function BlankLayout(props: RenderableProps<{}>) {
  return (
    <>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.min.css'
          integrity='sha512-KUoB3bZ1XRBYj1QcH4BHCQjurAZnCO3WdrswyLDtp7BMwCw7dPZngSLqILf68SGgvnWHTD5pPaYrXi6wiRJ65g=='
          crossOrigin='anonymous'
          referrerpolicy='no-referrer'
        />
        <script src='https://code.iconify.design/3/3.0.0/iconify.min.js'></script>
      </Head>
      <div>
        <Sidebar class='flex lg:(fixed left-0 top-0)'></Sidebar>
        <div class='ml-0 lg:ml-80'>{props.children}</div>
      </div>
    </>
  )
}

export function DefaultLayout(
  props: RenderableProps<{ title?: string | JSX.Element; showBack?: boolean }>
) {
  const renderTitle = (title?: string | JSX.Element) => {
    if (!title) return ''

    const titleEl =
      typeof title === 'string' ? (
        <h1 class='text-xl lg:text-2xl'>{props.title}</h1>
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
    <BlankLayout>
      <Head>
        {typeof props.title === 'string' && <title>{props.title}</title>}
      </Head>
      <div class='px-4 lg:px-10 pt-3 flex(& col) min-h-screen'>
        {renderTitle(props.title)}

        <div class='flex-1'>{props.children}</div>

        <div class='my-6'>
          <Footer />
        </div>
      </div>
    </BlankLayout>
  )
}

function Footer() {
  return (
    <div class='text-gray-500 text-center'>
      © 2022-{dayjs().year()} @{' '}
      <Link href={`mailto:${config.email}`}>{config.name}</Link>. Built top on{' '}
      <Link href='https://deno.land' target='_blank'>
        deno
      </Link>{' '}
      and{' '}
      <Link href='https://fresh.deno.dev' target='_blank'>
        fresh
      </Link>
      .
    </div>
  )
}

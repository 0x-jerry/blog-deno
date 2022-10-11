import { Head } from '$fresh/runtime.ts'
import ChangeLng from '../islands/ChangeLng.tsx'
import { t } from '../lib/i18n.ts'

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div>
        <div>
          <ChangeLng />
        </div>

        <div>{t('title.index', { name: '0x-jerry' })}</div>
      </div>
    </>
  )
}

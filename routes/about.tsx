import { Head } from '$fresh/runtime.ts'
import { BlankLayout } from '../components/Layout.tsx'
import { config } from '../conf.ts'
import { t } from '../lib/i18n.ts'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>{t('title.index', { name: config.name })}</title>
      </Head>
      <BlankLayout>
        <div>This is me</div>
      </BlankLayout>
    </>
  )
}

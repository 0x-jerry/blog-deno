import i18next, { TFunction } from 'https://esm.sh/i18next@21.10.0'
import { parse } from '$std/encoding/yaml.ts'
import { fromFileUrl } from '$std/path/mod.ts'

async function loadLng(lng: string) {
  const url = fromFileUrl(import.meta.resolve(`../locales/${lng}.yml`))

  const txt = await Deno.readTextFile(url)

  const r = await parse(txt)
  return r as any
}

await i18next.init({
  initImmediate: false, // setting initImediate to false, will load the resources synchronously
  fallbackLng: 'en',
  resources: {
    zh: {
      translation: await loadLng('zh'),
    },
    en: {
      translation: await loadLng('en')
    }
  }
})

export const i18nConf = {
  lng: Intl.DateTimeFormat().resolvedOptions().locale
}

export const t: TFunction = (...opt) => {
  const t = i18next.getFixedT(i18nConf.lng)

  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  return t(...opt)
}

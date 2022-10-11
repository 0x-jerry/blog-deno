import i18next, { TFunction } from 'https://esm.sh/i18next@21.10.0'
import Backend from 'https://esm.sh/i18next-fs-backend@1.1.5'

await i18next
  .use(Backend)
  .init({
    initImmediate: false, // setting initImediate to false, will load the resources synchronously
    fallbackLng: 'en',
    preload: ['zh', 'en'],
    backend: {
      // todo: use deno file system api to load all files
      loadPath: 'locales/{{lng}}.yml'
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

interface ILanguage {
  lang: string
  aliases?: string[]
}

export const languages: ILanguage[] = [
  {
    lang: 'ts',
    aliases: ['typescript']
  },
  {
    lang: 'js',
    aliases: ['javascript']
  },
  {
    lang: 'yaml',
    aliases: ['yml']
  },
  {
    lang: 'bash',
    aliases: ['sh']
  }
]

export const supportedLanguages = [
  'asm',
  'bash',
  'bf',
  'c',
  'css',
  'csv',
  'diff',
  'docker',
  'git',
  'go',
  'html',
  'http',
  'ini',
  'java',
  'js',
  'js_template_literals',
  'jsdoc',
  'json',
  'leanpub-md',
  'log',
  'lua',
  'make',
  'md',
  'pl',
  'plain',
  'py',
  'regex',
  'rs',
  'sql',
  'todo',
  'toml',
  'ts',
  'uri',
  'xml',
  'yaml'
]

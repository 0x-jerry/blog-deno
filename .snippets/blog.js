exports.default = {
  'Generate Post metadata': {
    scope: 'markdown',
    prefix: 'd.title',
    body: () => [
      //
      '---',
      'title: $1',
      'date: ' + new Date().toISOString(),
      'tags: [$2]',
      'publish: false',
      '---',
      ''
    ],
    description: 'Meta 数据'
  }
}

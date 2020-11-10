import numeral from 'numeral'

numeral.register('format', 'zh-number', {
  regexps: {
    format: /(zh)/,
    unformat: /(zh)/
  },
  format: function (value: number, format: string) {
    // check if has the space
    const space = numeral._.includes(format, ' zh') ? ' ' : ''

    // check for space before zh
    format = format.replace(/\s?zh/, '')

    const prevFormat = format.split('zh')[0]

    const cnNumberFormat = (val: number) => {
      if (isNaN(+val)) return val

      const symbolMap = [
        { value: 1e8, symbol: '亿' },
        { value: 1e4, symbol: '万' },
        { value: 1e3, symbol: '千' }
      ]

      for (let i = 0; i < symbolMap.length; i++) {
        if (Math.abs(val) >= symbolMap[i].value) {
          return numeral(val / symbolMap[i].value).format(prevFormat) + space + symbolMap[i].symbol
        }
      }

      return val.toString()
    }

    return cnNumberFormat(value)
  },
  unformat: function (string: string) {
    return numeral._.stringToNumber(string) * 0.01
  }
})

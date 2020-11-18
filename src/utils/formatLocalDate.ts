import numeral from 'numeral'

numeral.register('format', 'localDate', {
  regexps: {
    format: /YYYY(\/)MM(\/)DD/,
    unformat: /YYYY(\/)MM(\/)DD/
  },
  format: function (value: number) {
    // console.log(format)
    return new Date(value).toLocaleDateString()
  },
  unformat: function (string: string) {
    const timeArray = string.split('/')
    let seconds = 0

    // turn hours and minutes into seconds and add them all up
    if (timeArray.length === 3) {
      // hours
      seconds = seconds + (Number(timeArray[0]) * 60 * 60)
      // minutes
      seconds = seconds + (Number(timeArray[1]) * 60)
      // seconds
      seconds = seconds + Number(timeArray[2])
    } else if (timeArray.length === 2) {
      // minutes
      seconds = seconds + (Number(timeArray[0]) * 60)
      // seconds
      seconds = seconds + Number(timeArray[1])
    }
    return Number(seconds)
  }
})

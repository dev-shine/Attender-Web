const moment = require('moment')
let selectedDate = ''

class Calendar {

  load (date) {
    // need to convert it to string => moment obj so we won't alter the moment obj
    selectedDate = date.format()
    const startWeek = moment(selectedDate).startOf('month').week()
    const endWeek = moment(selectedDate).endOf('month').week()
    let calendar = []
    if (endWeek == 1) {
      // custom mapping for december
      let weeks = [48,49,50,51,52,1]
      for (let week of weeks) {
        let days = []
        if (week == 1) {
         days = Array(7).fill(0).map((n, i) => moment(selectedDate).add(1, 'years').week(week).startOf('week').clone().add(n + i, 'day'))
        } else {
          days = Array(7).fill(0).map((n, i) => moment(selectedDate).week(week).startOf('week').clone().add(n + i, 'day'))
        }
        calendar.push({week, days})
      }
    } else {
      for (let week = startWeek; week<=endWeek; week++) {
        let days = Array(7).fill(0).map((n, i) => moment(selectedDate).week(week).startOf('week').clone().add(n + i, 'day'))
        calendar.push({week, days})
      }
    }
    return calendar
  }

  next () {
    let nextMonth = moment(selectedDate).startOf('month').add(1, 'months')
    selectedDate = nextMonth
    return this.load(nextMonth.startOf('month'))
  }

  previous () {
    let prevMonth = moment(selectedDate).startOf('month').subtract(1, 'months')
    selectedDate = nextMonth
    return this.load(prevMonth.startOf('month'))
  }

}

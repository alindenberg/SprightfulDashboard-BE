import { Moment } from 'moment-timezone'
let moment_holidays = require('moment-holiday')
function format_error_response(error: Error) {
  return {
    'error': error.message
  }
}
function is_holiday(holidays: string[], date: Moment): boolean {
  return moment_holidays(date).isHoliday(holidays)
}
function is_weekend(date: Moment): boolean {
  return (date.day() == 6 || date.day() == 0)
}

export {
  format_error_response,
  is_holiday,
  is_weekend
}
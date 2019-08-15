import moment, { Moment } from 'moment-timezone'
let moment_holidays = require('moment-holiday')
import { BillingCycle } from '../domain/locations/models';
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
function get_current_billing_cycle(billing_cycles: BillingCycle[]): BillingCycle {
  const current = moment()
  for (let i = 0; i < billing_cycles.length; i++) {
    const billing_cycle = billing_cycles[i]
    if (moment(billing_cycle.start_date) < current && moment(billing_cycle.end_date) > current) {
      return billing_cycle
    }
  }
  throw Error("Could not get current billing cycle for location.")
}
export {
  format_error_response,
  is_holiday,
  is_weekend,
  get_current_billing_cycle
}
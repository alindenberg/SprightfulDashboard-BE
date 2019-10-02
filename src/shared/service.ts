import jwt from 'jsonwebtoken'
import moment, { Moment } from 'moment-timezone'
import { BillingCycle } from '../domain/locations/models';
let moment_holidays = require('moment-holiday')

function generate_jwt(): string {
  return jwt.sign({ admin: false }, process.env.SECRET, { expiresIn: "1h" })
}

function validate_jwt(req: any, res: any, next: any) {
  const token = req.headers['jwt']
  try {
    jwt.verify(token, process.env.SECRET)
    next()

  } catch (err) {
    res.status(401)
    res.send(format_error_response(err))
    return
  }
}
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
  generate_jwt,
  validate_jwt,
  format_error_response,
  is_holiday,
  is_weekend,
  get_current_billing_cycle
}
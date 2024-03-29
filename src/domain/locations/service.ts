import base64 from 'base-64'
import uuidv4 from 'uuid/v4'
import fetch from 'node-fetch'
import moment, { Moment } from 'moment-timezone'
import PowerCompanyService from '../powerCompanys/service'
import LocationRepository from './repository'
import Location, { BillingCycle, Bank } from './models'
import { EnergyInfo } from '../../shared/models';

export default class {
  power_company_service: PowerCompanyService
  repository: LocationRepository

  constructor() {
    this.power_company_service = new PowerCompanyService()
    this.repository = new LocationRepository()
  }

  get_location(location_id: string): Promise<Location> {
    return this.repository.get_location(location_id)
  }
  get_locations(userId: string): Promise<Location[]> {
    return userId ? this.repository.get_locations_for_user(userId) : this.repository.get_locations()
  }
  create_location(
    name: string,
    owner_id: string,
    sensor_id: string,
    fpl_id: string,
    is_ssp: boolean,
    generation_goal: number,
    power_company_id: string,
    billing_cycles: BillingCycle[],
    thermostats: string[],
  ): Promise<Location> {
    // TODO - validate billing cycles
    const location = new Location(uuidv4(), name, owner_id, sensor_id, is_ssp, fpl_id, power_company_id, generation_goal, billing_cycles, thermostats)
    return this.repository.create_location(location)
  }
  get_user_locations(user_id: string): Promise<Location[]> {
    return this.repository.get_user_locations(user_id)
  }
  delete_location(location_id: string): Promise<boolean> {
    return this.repository.delete_location(location_id)
  }
  update_location_billing_cycles(location_id: string, billing_cycles: BillingCycle[]): Promise<boolean> {
    // TODO: validate billing cycles. (should be 12(?) non overlapping & continuous linking on end-to-start days)
    // let error = this.validateBillingCycles(billing_cycles)
    // if (error != null) {
    //   throw error
    // }
    return this.repository.update_location_billing_cycles(location_id, billing_cycles)
  }
  get_fpl_info(fpl_id: string) {
    return fetch(`https://www.fpl.com/api/resources/account/${fpl_id}/energyUsage`, {
      method: 'GET',
      headers: {
        'Authorization': ('Basic ' + base64.encode(process.env.FPL_USERNAME + ":" + process.env.FPL_PASSWORD))
      }
    }).then(async res => {
      const result = (await res.json()).data[0]
      console.log("Result ", result)
      return result
    }).catch(err => {
      console.log("Error getting FPL data: ", err)
      throw err
    })
  }
  async get_energy_info(sensor_id: string, power_company_id: string,
    start_date_string: string, end_date_string: string): Promise<EnergyInfo[]> {
    // If location doesn't have neurio sensor, throw error to be rendered
    if (sensor_id == null) {
      throw Error("No Neurio sensor registered for location")
    }
    let sensor_data: any[] = []
    let start_date: Moment;
    let end_date: Moment;
    let hourGranularity = false
    // Account for requests spanning more than neurio's maximum 31-day range
    try {
      start_date = moment(start_date_string).tz('America/New_York')
      end_date = moment(end_date_string).tz('America/New_York')
      start_date_string = start_date.toISOString()
      end_date_string = end_date.toISOString()

      // if only 1-day interval, we want to get hour granularity
      hourGranularity = moment.duration(end_date.diff(start_date)).asDays() == 1;
    } catch (err) {
      throw err
    }
    let end_dates = []
    while (end_date.diff(start_date, 'days') > 31) {
      let next_start_date = start_date.add(31, 'days')
      end_dates.push(next_start_date.toISOString())
      start_date = next_start_date
    }
    end_dates.push(end_date_string)

    let start = start_date_string
    for (let i = 0; i < end_dates.length; i++) {
      let end = end_dates[i]
      await fetch(`https://api.neur.io/v1/samples/stats?sensorId=${sensor_id}&start=${start}&end=${end}&granularity=hours&frequency=1&perPage=500&page=1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DASHBOARD_NEURIO_TOKEN}`
        }
      }).then(async (res) => {
        const data = await res.json()
        sensor_data.push(...data)
        start = end
      }).catch(() => {
        throw new Error('Error getting neurio data')
      })
    }

    return await this.power_company_service.analyze_neurio_data(power_company_id, hourGranularity, sensor_data)
  }
  // Billing cycles should be contiguous non-overlapping and cover all 365 days of the year
  // private validateBillingCycles(billing_cycles: BillingCycle[]): Error {
  //   for (let i = 0; i < billing_cycles.length; i++) {
  //     // Validate billing cycle length
  //     if (billing_cycles[i].start_date >= billing_cycles[i].end_date) {
  //       return new Error(`Billing cycle must not have end date (${billing_cycles[i].end_date}) on same day or before the start date (${billing_cycles[i].start_date}).`)
  //     }
  //     // Validate first billing cycles start date is the day after the last billing cycle's end date
  //     else if (i == 0 && billing_cycles[i].start_date != (billing_cycles[billing_cycles.length - 1].end_date + 1)) {
  //       return new Error("Billing cycles must be contiguous, non-overlapping segments that cover a whole year")
  //     }
  //     // Validate billing cycle starts on day after the previous one ends
  //     else if (i != 0 && billing_cycles[i].start_date != (billing_cycles[i - 1].end_date + 1)) {
  //       return new Error("Billing cycles must be contiguous, non-overlapping segments that cover a whole year")
  //     }
  //   }
  // }
}
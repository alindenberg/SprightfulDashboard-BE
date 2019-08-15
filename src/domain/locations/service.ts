import base64 from 'base-64'
import uuidv4 from 'uuid/v4'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import PowerCompanyService from '../powerCompanys/service'
import LocationRepository from './repository'
import Location, { BillingCycle, Bank } from './models'

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
  create_location(
    name: string,
    owner_id: string,
    neurio_sensor_id: string,
    fpl_id: string,
    power_company_id: string,
    is_tou: boolean,
    billing_cycles: BillingCycle[],
    thermostats: string[],
    bank: Bank
  ): Promise<Location> {
    const location = new Location(uuidv4(), name, owner_id, neurio_sensor_id, fpl_id, power_company_id, is_tou, billing_cycles, thermostats, bank)
    console.log("Adding location ", location)
    return this.repository.create_location(location)
  }
  get_user_locations(user_id: string): Promise<Location[]> {
    return this.repository.get_user_locations(user_id)
  }
  delete_location(location_id: string): Promise<boolean> {
    return this.repository.delete_location(location_id)
  }
  update_location_bank(location_id: string, bank: Bank): Promise<Boolean> {
    let error = this.validate_bank(bank)
    if (error != null) {
      throw error
    }
    return this.repository.update_location_bank(location_id, bank)
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
      return (await res.json()).data
    }).catch(err => {
      console.log("Error ", err)
      return null
    })
  }
  async get_neurio_info(sensor_id: string, power_company_id: string, is_tou: boolean, start: string, end: string) {
    // If location doesn't have neurio sensor, throw error to be rendered
    if (sensor_id == null) {
      throw Error("No Neurio sensor registered for location")
    }
    return fetch(`https://api.neur.io/v1/samples/stats?sensorId=${sensor_id}&start=${start}&end=${end}&granularity=hours&frequency=1&perPage=500&page=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEURIO_TOKEN}`
      }
    }).then(async (res) => {
      if (res.status == 400) {
        throw Error(`Error fetching neurio data ${res.statusText}`)
      }
      return await this.power_company_service.analyze_neurio_data(power_company_id, is_tou, await res.json())
    }).catch(err => {
      console.log("Error ", err)
      return null
    })
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
  private validate_bank(bank: Bank): Error {
    if (
      bank.flat_rate_hours < 0 ||
      bank.off_peak_hours < 0 ||
      bank.on_peak_hours < 0) {
      return new Error("Bank value may not be less than 0")
    }
  }
}
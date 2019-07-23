import uuidv4 from 'uuid/v4'
import LocationRepository from '../repository'
import Location, { BillingCycle, Bank } from '../models'

export default class {
  repository: LocationRepository

  constructor() {
    this.repository = new LocationRepository()
  }

  getLocation(location_id: string): Promise<Location> {
    return this.repository.getLocation(location_id)
  }

  createLocation(
    name: string,
    neurio_sensor_id: string,
    power_company_id: string,
    billing_cycles: BillingCycle[],
    thermostats: string[],
    bank: Bank
  ): Promise<Location> {
    const location = new Location(uuidv4(), name, neurio_sensor_id, power_company_id, billing_cycles, thermostats, bank)
    return this.repository.createLocation(location)
  }

  getEnergyInfo() {
    return {
      "amount": "Some energy info"
    }
  }

  getSavingsInfo() {
    return {
      "amount": "Some savings info"
    }
  }

  deleteLocation(location_id: string): Promise<boolean> {
    return this.repository.deleteLocation(location_id)
  }

  updateLocationBank(location_id: string, bank: Bank): Promise<Boolean> {
    let error = this.validateBank(bank)
    if (error != null) {
      throw error
    }
    return this.repository.updateLocationBank(location_id, bank)
  }

  updateLocationBillingCycles(location_id: string, billing_cycles: BillingCycle[]): Promise<boolean> {
    // TODO: validate billing cycles. (should be 12(?) non overlapping & continuous linking on end-to-start days)
    // let error = this.validateBillingCycles(billing_cycles)
    // if (error != null) {
    //   throw error
    // }
    return this.repository.updateLocationBillingCycles(location_id, billing_cycles)
  }

  // Billing cycles should be contiguous non-overlapping and cover all 365 days of the year
  private validateBillingCycles(billing_cycles: BillingCycle[]): Error {
    for (let i = 0; i < billing_cycles.length; i++) {
      // Validate billing cycle length
      if (billing_cycles[i].start_date >= billing_cycles[i].end_date) {
        return new Error(`Billing cycle must not have end date (${billing_cycles[i].end_date}) on same day or before the start date (${billing_cycles[i].start_date}).`)
      }
      // Validate first billing cycles start date is the day after the last billing cycle's end date
      else if (i == 0 && billing_cycles[i].start_date != (billing_cycles[billing_cycles.length - 1].end_date + 1)) {
        return new Error("Billing cycles must be contiguous, non-overlapping segments that cover a whole year")
      }
      // Validate billing cycle starts on day after the previous one ends
      else if (i != 0 && billing_cycles[i].start_date != (billing_cycles[i - 1].end_date + 1)) {
        return new Error("Billing cycles must be contiguous, non-overlapping segments that cover a whole year")
      }
    }
  }
  private validateBank(bank: Bank): Error {
    if (
      bank.flat_rate_hours < 0 ||
      bank.off_peak_hours < 0 ||
      bank.on_peak_hours < 0) {
      return new Error("Bank value may not be less than 0")
    }
  }
}
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
    return this.repository.updateLocationBillingCycles(location_id, billing_cycles)
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
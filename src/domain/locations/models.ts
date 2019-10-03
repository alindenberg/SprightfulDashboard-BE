import { Moment } from "moment";

export default class Location {
  location_id: string
  name: string
  owner_id: string
  is_ssp: boolean
  fpl_id: string
  sensor_id: string
  generation_goal: number
  power_company_id: string
  billing_cycles: BillingCycle[]
  // Replace with Thermostat object
  thermostats: string[]

  constructor(
    location_id: string,
    name: string,
    owner_id: string,
    sensor_id: string,
    is_ssp: boolean,
    fpl_id: string,
    power_company_id: string,
    generation_goal: number,
    billing_cycles: BillingCycle[],
    thermostats: string[]) {
    this.location_id = location_id
    this.name = name
    this.owner_id = owner_id
    this.sensor_id = sensor_id
    this.fpl_id = fpl_id
    this.power_company_id = power_company_id
    this.is_ssp = is_ssp
    this.generation_goal = generation_goal
    this.billing_cycles = billing_cycles
    this.thermostats = thermostats ? thermostats : []
  }
}

class BillingCycle {
  start_date: Moment
  end_date: Moment
  bub: number

  constructor(start_date: Moment, end_date: Moment, bub: number) {
    this.start_date = start_date
    this.end_date = end_date
    this.bub = bub
  }
}

class Bank {
  off_peak_hours: number
  on_peak_hours: number
  flat_rate_hours: number
}

class SavingsInfo {
  amount: string
}

class EnergyInfo {
  amount: string
}

export {
  BillingCycle,
  Bank
}
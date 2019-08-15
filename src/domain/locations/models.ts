import PowerCompany from '../powerCompanys/models';
import { Moment } from "moment";
import moment = require("moment");

export default class Location {
  location_id: string
  name: string
  owner_id: string
  neurio_sensor_id: string
  fpl_id: string
  power_company_id: string
  is_tou: boolean
  billing_cycles: BillingCycle[]
  // Replace with Thermostat object
  thermostats: string[]
  bank: Bank

  constructor(
    location_id: string,
    name: string,
    owner_id: string,
    neurio_sensor_id: string,
    fpl_id: string,
    power_company_id: string,
    is_tou: boolean,
    billing_cycles: BillingCycle[],
    thermostats: string[],
    bank: Bank) {
    this.location_id = location_id
    this.name = name
    this.owner_id = owner_id
    this.neurio_sensor_id = neurio_sensor_id
    this.fpl_id = fpl_id
    this.power_company_id = power_company_id
    this.is_tou = is_tou
    this.billing_cycles = billing_cycles
    this.thermostats = thermostats ? thermostats : []
    this.bank = bank
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
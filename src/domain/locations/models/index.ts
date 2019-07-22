import { PowerCompany } from "../../powerCompanys/models";

export default class {
  location_name: string
  neurio_sensor_id: string
  power_company_id: string
  power_company: PowerCompany
  billing_cycles: BillingCycle[]
  // Replace with Thermostat object
  thermostats: string[]
  bank: Bank
  savings_info: SavingsInfo
  energy_info: EnergyInfo
}

class BillingCycle {
  name: string
  start_time: number
  end_time: number
  start_date: string
  end_date: string

  constructor(name: string, start_time: number, end_time: number, start_date: string, end_date: string) {
    this.name = name
    this.start_time = start_time
    this.end_time = end_time
    this.start_date = start_date
    this.end_date = end_date
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
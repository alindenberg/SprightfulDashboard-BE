export class NeurioData {
  on_peak_generation: number
  on_peak_consumption: number
  off_peak_generation: number
  off_peak_consumption: number
  timestamp: string

  constructor(
    on_peak_generation: number,
    on_peak_consumption: number,
    off_peak_generation: number,
    off_peak_consumption: number,
    timestamp: string
  ) {
    this.on_peak_generation = on_peak_generation
    this.on_peak_consumption = on_peak_consumption
    this.off_peak_generation = off_peak_generation
    this.off_peak_consumption = off_peak_consumption
    this.timestamp = timestamp
  }
}
export class EnergyInfo {
  on_peak: {
    generation_kwh: number
    generation_savings: number
    consumption_kwh: number
    consumption_cost: number
  }
  off_peak: {
    generation_kwh: number
    generation_savings: number
    consumption_kwh: number
    consumption_cost: number
  }
  timestamp: string
  constructor(
    on_peak_generation: number,
    on_peak_generation_savings: number,
    on_peak_consumption: number,
    on_peak_consumption_cost: number,
    off_peak_generation: number,
    off_peak_generation_savings: number,
    off_peak_consumption: number,
    off_peak_consumption_cost: number,
    timestamp: string
  ) {
    this.on_peak = {
      generation_kwh: on_peak_generation,
      generation_savings: on_peak_generation_savings,
      consumption_kwh: on_peak_consumption,
      consumption_cost: on_peak_consumption_cost
    }
    this.off_peak = {
      generation_kwh: off_peak_generation,
      generation_savings: off_peak_generation_savings,
      consumption_kwh: off_peak_consumption,
      consumption_cost: off_peak_consumption_cost
    }
    this.timestamp = timestamp
  }
}
export class FplData {
  on_peak_consumption: number
  off_peak_consumption: number
  total_consumption: number
  charge: number
  start_date: string
  end_date: string

  constructor(
    on_peak_consumption: number,
    off_peak_consumption: number,
    total_consumption: number,
    charge: number,
    start_date: string,
    end_date: string
  ) {
    this.on_peak_consumption = on_peak_consumption
    this.off_peak_consumption = off_peak_consumption
    this.total_consumption = total_consumption
    this.charge = charge
    this.start_date = start_date
    this.end_date = end_date
  }
}
export class NeurioData {
  total_generation: number
  total_consumption: number
  on_peak_generation: number
  on_peak_consumption: number
  off_peak_generation: number
  off_peak_consumption: number

  constructor(
    total_generation: number,
    total_consumption: number,
    on_peak_generation: number,
    on_peak_consumption: number,
    off_peak_generation: number,
    off_peak_consumption: number
  ) {
    this.total_generation = total_generation
    this.total_consumption = total_consumption
    this.on_peak_generation = on_peak_generation
    this.on_peak_consumption = on_peak_consumption
    this.off_peak_generation = off_peak_generation
    this.off_peak_consumption = off_peak_consumption
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
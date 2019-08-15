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
export class NeurioCostInfo {
  on_peak_energy_generated: number
  on_peak_energy_consumed: number
  off_peak_energy_generated: number
  off_peak_energy_consumed: number
  total_generation: number
  total_consumption: number
  on_peak_price: number
  off_peak_price: number
  flat_rate_price: number
  total_tou_price: number
  total_flat_rate_price: number

  constructor(
    on_peak_energy_generated: number,
    on_peak_energy_consumed: number,
    off_peak_energy_generated: number,
    off_peak_energy_consumed: number,
    on_peak_price: number,
    off_peak_price: number,
    flat_rate_price: number,
    base_charge: number
  ) {
    this.on_peak_energy_generated = on_peak_energy_generated
    this.on_peak_energy_consumed = on_peak_energy_consumed
    this.off_peak_energy_generated = off_peak_energy_generated
    this.off_peak_energy_consumed = off_peak_energy_consumed
    this.total_generation = Number(on_peak_energy_generated) + Number(off_peak_energy_generated)
    this.total_consumption = Number(on_peak_energy_consumed) + Number(off_peak_energy_consumed)
    this.on_peak_price = on_peak_price
    this.off_peak_price = off_peak_price
    this.flat_rate_price = flat_rate_price
    this.total_tou_price = Number(base_charge) + Number(on_peak_price + Number(off_peak_price))
    this.total_flat_rate_price = Number(base_charge) + Number(flat_rate_price)
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
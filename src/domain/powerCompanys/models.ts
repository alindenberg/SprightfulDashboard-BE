export default class PowerCompany {
  power_company_id: string
  name: string
  abbreviated_name: string
  rates: PowerCompanyRates
  peaks: PowerCompanyPeak[]

  constructor(power_company_id: string, name: string, abbreviated_name: string, rates: PowerCompanyRates, peaks: PowerCompanyPeak[]) {
    this.power_company_id = power_company_id
    this.name = name
    this.abbreviated_name = abbreviated_name
    this.rates = rates
    this.peaks = peaks
  }
}
class PowerCompanyRates {
  base_charge: number
  flat_under: number
  flat_over: number
  on_peak_under: number
  on_peak_over: number
  off_peak_under: number
  off_peak_over: number
}
class PowerCompanyPeak {
  name: string
  start_time: number
  end_time: number
  start_date: Date
  end_date: Date
}
export {
  PowerCompanyRates,
  PowerCompanyPeak
}
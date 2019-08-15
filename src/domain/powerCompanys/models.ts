import moment from 'moment-timezone'
import { is_weekend, is_holiday } from '../../shared/service'
import { NeurioData } from '../..//shared/models';
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
  format_neurio_sensor_data(is_tou: boolean, neurio_data: any[]): NeurioData {
    const holidays = ['Thanksgiving Day', 'Christmas Day', "New Year\'s Day", 'Memorial Day', 'Independence Day', 'Martin Luther King Jr. Day']
    let on_peak_consumption = 0
    let on_peak_generation = 0
    let off_peak_consumption = 0
    let off_peak_generation = 0

    for (let i = 0; i < neurio_data.length; i++) {
      const data = neurio_data[i]

      const date = moment(data.start)
      const hour = date.hour()

      let is_on_peak = false
      // if location isn't on TOU, or data is from a weekend, or it's a  holiday - dont add to on peak
      if (is_tou && !is_weekend(date) && !is_holiday(holidays, date)) {
        for (let j = 0; j < this.peaks.length; j++) {
          const peak = this.peaks[j]

          const peak_start = moment(peak.start_date).set('year', date.year())
          const peak_end = moment(peak.end_date).set('year', peak.name.includes('Winter') ? (date.year() + 1) : date.year())
          if (peak_start <= date && peak_end > date && peak.start_time <= hour && peak.end_time > hour) {
            if (data.generationEnergy != undefined) {
              on_peak_generation += data.generationEnergy
            }
            on_peak_consumption += data.consumptionEnergy
            is_on_peak = true
            break
          }
        }
      }
      if (!is_on_peak) {
        if (data.generationEnergy != undefined) {
          off_peak_generation += data.generationEnergy
        }
        off_peak_consumption += data.consumptionEnergy
      }
    }
    return new NeurioData(
      this.format_energy(on_peak_generation + off_peak_generation),
      this.format_energy(on_peak_consumption + off_peak_consumption),
      this.format_energy(on_peak_generation),
      this.format_energy(on_peak_consumption),
      this.format_energy(off_peak_generation),
      this.format_energy(off_peak_consumption)
    )
  }
  private format_energy(value: number): number {
    //convert from watt-seconds format to kilowatt-hours format
    return Number(value) / (60 * 60 * 1000)
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
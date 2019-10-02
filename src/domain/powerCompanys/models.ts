import moment from 'moment-timezone'
import { is_weekend, is_holiday } from '../../shared/service'
import { EnergyInfo } from '../../shared/models';
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
  // Get data into day-granularity objects with on-peak / off-peak energy sums
  format_data(neurio_data: any[]): EnergyInfo[] {
    const holidays = ['Thanksgiving Day', 'Christmas Day', "New Year\'s Day", 'Memorial Day', 'Independence Day', 'Martin Luther King Jr. Day']
    let parsed_data: EnergyInfo[] = []
    let on_peak_consumption = 0
    let on_peak_generation = 0
    let off_peak_consumption = 0
    let off_peak_generation = 0

    let current_day = moment(neurio_data[0].start).tz('America/New_York').format("MM/DD/YYYY")
    for (let i = 0; i < neurio_data.length; i++) {
      const data = neurio_data[i]

      const date = moment(data.start).tz('America/New_York')
      const hour = date.hour()

      //if we've gone to the next interval, add the previous object and reset counts
      if (date.format("MM/DD/YYYY") != current_day) {
        parsed_data.push(
          new EnergyInfo(
            on_peak_generation,
            this.get_cost(on_peak_generation, this.rates.on_peak_under, this.rates.on_peak_over),
            on_peak_consumption,
            this.get_cost(on_peak_consumption, this.rates.on_peak_under, this.rates.on_peak_over),
            off_peak_generation,
            this.get_cost(off_peak_generation, this.rates.off_peak_under, this.rates.off_peak_over),
            off_peak_consumption,
            this.get_cost(off_peak_consumption, this.rates.off_peak_under, this.rates.off_peak_over),
            current_day
          )
        )
        on_peak_consumption = 0
        on_peak_generation = 0
        off_peak_consumption = 0
        off_peak_generation = 0

        current_day = date.format('MM/DD/YYYY')
      }

      let is_on_peak = false
      // if data is from a weekend, or it's a  holiday - dont add to on peak
      if (!is_weekend(date) && !is_holiday(holidays, date)) {
        for (let j = 0; j < this.peaks.length; j++) {
          const peak = this.peaks[j]

          const peak_start = moment(peak.start_date).set('year', date.year())
          const peak_end = moment(peak.end_date).set('year', peak.name.includes('Winter') ? (date.year() + 1) : date.year())
          if (peak_start <= date && peak_end > date && peak.start_time <= hour && peak.end_time > hour) {
            on_peak_generation += data.generationEnergy != undefined ? this.format_energy(data.generationEnergy) : 0
            on_peak_consumption += this.format_energy(data.consumptionEnergy)
            is_on_peak = true
            break
          }
        }
      }
      if (!is_on_peak) {
        off_peak_generation += data.generationEnergy != undefined ? this.format_energy(data.generationEnergy) : 0
        off_peak_consumption += this.format_energy(data.consumptionEnergy)
      }
    }

    parsed_data.push(
      new EnergyInfo(
        on_peak_generation,
        this.get_cost(on_peak_generation, this.rates.on_peak_under, this.rates.on_peak_over),
        on_peak_consumption,
        this.get_cost(on_peak_consumption, this.rates.on_peak_under, this.rates.on_peak_over),
        off_peak_generation,
        this.get_cost(off_peak_generation, this.rates.off_peak_under, this.rates.off_peak_over),
        off_peak_consumption,
        this.get_cost(off_peak_consumption, this.rates.off_peak_under, this.rates.off_peak_over),
        current_day
      )
    )

    return parsed_data
  }

  format_hourly_data(neurio_data: any[]): EnergyInfo[] {
    const holidays = ['Thanksgiving Day', 'Christmas Day', "New Year\'s Day", 'Memorial Day', 'Independence Day', 'Martin Luther King Jr. Day']
    let parsed_data: EnergyInfo[] = []

    for (let i = 0; i < neurio_data.length; i++) {
      const data = neurio_data[i]

      const generation_energy = data.generationEnergy != undefined ? this.format_energy(data.generationEnergy) : 0
      const consumption_energy = this.format_energy(data.consumptionEnergy)

      const date = moment(data.start).tz('America/New_York')
      const hour = date.hour()

      let is_on_peak = false
      // if data is from a weekend, or it's a  holiday - dont add to on peak
      if (!is_weekend(date) && !is_holiday(holidays, date)) {
        for (let j = 0; j < this.peaks.length; j++) {
          const peak = this.peaks[j]

          const peak_start = moment(peak.start_date).set('year', date.year())
          const peak_end = moment(peak.end_date).set('year', peak.name.includes('Winter') ? (date.year() + 1) : date.year())
          if (peak_start <= date && peak_end > date && peak.start_time <= hour && peak.end_time > hour) {
            parsed_data.push(
              new EnergyInfo(
                generation_energy,
                this.get_cost(generation_energy, this.rates.on_peak_under, this.rates.on_peak_over),
                consumption_energy,
                this.get_cost(consumption_energy, this.rates.on_peak_under, this.rates.on_peak_over),
                0,
                0,
                0,
                0,
                date.format('hh:mm A')
              )
            )
            is_on_peak = true
            break
          }
        }
      }
      if (!is_on_peak) {
        parsed_data.push(
          new EnergyInfo(
            0,
            0,
            0,
            0,
            generation_energy,
            this.get_cost(generation_energy, this.rates.off_peak_under, this.rates.off_peak_over),
            consumption_energy,
            this.get_cost(consumption_energy, this.rates.off_peak_under, this.rates.off_peak_over),
            date.format('hh:mm A')
          )
        )
      }
    }

    return parsed_data
  }
  private format_energy(value: number): number {
    //convert from watt-seconds format to kilowatt-hours format
    return Number(value) / (60 * 60 * 1000)
  }

  private get_cost(energy_amount: number, under_price: number, over_price: number): number {
    const under_charge = (Math.min(1000, energy_amount) * under_price)
    const over_charge = (Math.max(0, energy_amount - 1000) * over_price)

    return Number(under_charge) + Number(over_charge)
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
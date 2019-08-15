import uuidv4 from 'uuid/v4';
import PowerCompany, { PowerCompanyPeak, PowerCompanyRates } from './models'
import { NeurioData, NeurioCostInfo } from '../../shared/models'
import PowerCompanyRepository from './repository';

export default class {
  repository: PowerCompanyRepository
  constructor() {
    this.repository = new PowerCompanyRepository()
  }
  get_power_company(power_company_id: string): Promise<PowerCompany> {
    return this.repository.get_power_company(power_company_id)
  }
  create_power_company(
    name: string,
    abbreviated_name: string,
    rates: PowerCompanyRates,
    peaks: PowerCompanyPeak[]
  ): Promise<PowerCompany> {

    const powercompany = new PowerCompany(uuidv4(), name, abbreviated_name, rates, peaks)
    return this.repository.create_power_company(powercompany)
  }
  update_power_company(
    power_company_id: string,
    name: string,
    abbreviated_name: string,
    rates: PowerCompanyRates,
    peaks: PowerCompanyPeak[]
  ): Promise<PowerCompany> {
    const powercompany = new PowerCompany(power_company_id, name, abbreviated_name, rates, peaks)
    return this.repository.update_power_company(powercompany)
  }
  delete_power_company(power_company_id: string): Promise<Boolean> {
    return this.repository.delete_power_company(power_company_id)
  }
  async analyze_neurio_data(power_company_id: string, is_tou: boolean, neurio_data: any[]): Promise<NeurioCostInfo> {
    return await this.get_power_company(power_company_id).then((power_company) => {
      const pc = new PowerCompany(
        power_company.power_company_id,
        power_company.name,
        power_company.abbreviated_name,
        power_company.rates,
        power_company.peaks)

      const formatted_data = pc.format_neurio_sensor_data(is_tou, neurio_data)

      const net_on_peak_energy = formatted_data.on_peak_consumption - formatted_data.on_peak_generation
      const on_peak_cost = this.get_cost_for_hours(net_on_peak_energy, pc.rates.on_peak_under, pc.rates.on_peak_over)

      const net_off_peak_energy = formatted_data.off_peak_consumption - formatted_data.off_peak_generation
      const off_peak_cost = this.get_cost_for_hours(net_off_peak_energy, pc.rates.off_peak_under, pc.rates.off_peak_over)

      const net_total_energy = formatted_data.total_consumption - formatted_data.total_generation
      const flat_rate_cost = this.get_cost_for_hours(net_total_energy, pc.rates.flat_under, pc.rates.flat_over)

      return new NeurioCostInfo(
        formatted_data.on_peak_generation,
        formatted_data.on_peak_consumption,
        formatted_data.off_peak_generation,
        formatted_data.off_peak_consumption,
        on_peak_cost,
        off_peak_cost,
        flat_rate_cost,
        pc.rates.base_charge
      )

    }).catch(err => {
      console.log("Error analyzing neurio data ", err)
      throw err
    })
  }
  private get_cost_for_hours(energy_amount: number, under_price: number, over_price: number): number {
    const under_charge = (Math.min(1000, energy_amount) * under_price)
    const over_charge = (Math.max(0, energy_amount - 1000) * over_price)

    return Number(under_charge) + Number(over_charge)
  }
}
import uuidv4 from 'uuid/v4';
import PowerCompany, { PowerCompanyPeak, PowerCompanyRates } from './models'
import { EnergyInfo } from '../../shared/models'
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
  async analyze_neurio_data(power_company_id: string, hourGranularity: boolean, neurio_data: any[]): Promise<EnergyInfo[]> {
    return await this.get_power_company(power_company_id).then((power_company) => {
      const pc = new PowerCompany(
        power_company.power_company_id,
        power_company.name,
        power_company.abbreviated_name,
        power_company.rates,
        power_company.peaks)

      return hourGranularity ? pc.format_hourly_data(neurio_data) : pc.format_data(neurio_data)

    }).catch(err => {
      console.log("Error analyzing neurio data ", err)
      throw err
    })
  }
}
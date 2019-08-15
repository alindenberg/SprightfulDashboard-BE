import uuidv4 from 'uuid/v4';
import PowerCompany, { PowerCompanyPeak, PowerCompanyRates } from './models'
import { NeurioData } from '../../shared/models'
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
  analyze_neurio_data(power_company_id: string, is_tou: boolean, neurio_data: any[]): Promise<NeurioData> {
    return this.get_power_company(power_company_id).then((power_company) => {
      // TODO - analyze data
      return new NeurioData(1, 1, 1, 1, 1, 1)
    }).catch(err => {
      console.log("Error analyzing neurio data ", err)
      throw err
    })
  }
}
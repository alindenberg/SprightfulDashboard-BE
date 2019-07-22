import uuidv4 from 'uuid/v4';
import PowerCompany, { PowerCompanyPeak, PowerCompanyRates } from '../models'
import PowerCompanyRepository from '../repository';

export default class {
  repository: PowerCompanyRepository
  constructor() {
    this.repository = new PowerCompanyRepository()
  }
  getPowerCompany(power_company_id: string): Promise<PowerCompany> {
    return this.repository.getPowerCompany(power_company_id)
  }

  createPowerCompany(
    name: string,
    abbreviated_name: string,
    rates: PowerCompanyRates,
    peaks: PowerCompanyPeak[]
  ): Promise<PowerCompany> {

    const powercompany = new PowerCompany(uuidv4(), name, abbreviated_name, rates, peaks)
    return this.repository.createPowerCompany(powercompany)
  }

  updatePowerCompany(
    power_company_id: string,
    name: string,
    abbreviated_name: string,
    rates: PowerCompanyRates,
    peaks: PowerCompanyPeak[]
  ): Promise<PowerCompany> {
    const powercompany = new PowerCompany(power_company_id, name, abbreviated_name, rates, peaks)
    return this.repository.updatePowerCompany(powercompany)
  }

  deletePowerCompany(power_company_id: string): Promise<Boolean> {
    return this.repository.deletePowerCompany(power_company_id)
  }
}
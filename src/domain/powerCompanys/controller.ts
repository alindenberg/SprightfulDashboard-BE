import PowerCompanyService from './service'
import PowerCompany from './models'

export default class {
  service: PowerCompanyService
  constructor() {
    this.service = new PowerCompanyService()
  }
  get_power_company(req: any): Promise<PowerCompany> {
    return this.service.get_power_company(req.params.power_company_id)
  }
  create_power_company(req: any): Promise<PowerCompany> {
    return this.service.create_power_company(
      req.body.name,
      req.abbreviated_name,
      req.body.rates,
      req.body.peaks)
  }
}

import PowerCompanyService from '../../service'

const service = new PowerCompanyService()

export default {
  getPowerCompany: async (obj: any, args: any, context: any) => {
    return await service.getPowerCompany(args.power_company_id)
  }
}
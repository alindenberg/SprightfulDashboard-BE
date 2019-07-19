import PowerCompanyService from '../../service'

const service = new PowerCompanyService()

export default {
  createPowerCompany: async (obj: any, args: any, context: any) => {
    return await service.createPowerCompany(
      args.name,
      args.abbreviated_name,
      args.rates,
      args.peaks
    )
  }
}
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
  },
  updatePowerCompany: async (obj: any, args: any, context: any) => {
    return await service.updatePowerCompany(
      args.power_company_id,
      args.name,
      args.abbreviated_name,
      args.rates,
      args.peaks
    )
  },
  deletePowerCompany: async (obj: any, args: any, context: any) => {
    return await service.deletePowerCompany(args.power_company_id).catch(err => {
      console.log("Error deleting power company with id: ", args.power_company_id)
    })
  }
}
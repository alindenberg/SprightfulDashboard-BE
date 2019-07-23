import LocationService from '../../service'
import PowerCompanyService from '../../../powerCompanys/service'

const service = new LocationService()
const powerCompanyService = new PowerCompanyService()
export default {
  Location: {
    energy_info: async (obj: any, args: any, context: any) => {
      return await service.getEnergyInfo()
    },
    savings_info: async (obj: any, args: any, context: any) => {
      return await service.getSavingsInfo()
    },
    power_company: async (obj: any, args: any, context: any) => {
      return await powerCompanyService.getPowerCompany(obj.power_company_id)
    }
  }
}
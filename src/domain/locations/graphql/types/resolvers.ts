import LocationService from '../../service'
import PowerCompanyService from '../../../powerCompanys/service'

const service = new LocationService()
const powerCompanyService = new PowerCompanyService()
export default {
  Location: {
    neurio_info: async (obj: any, args: any, context: any) => {
      return await service.getNeurioInfo(obj.neurio_sensor_id, args.start_date, args.end_date)
    },
    fpl_info: async (obj: any, args: any, context: any) => {
      return await service.getFplInfo(obj.fpl_id)
    },
    power_company: async (obj: any, args: any, context: any) => {
      return await powerCompanyService.getPowerCompany(obj.power_company_id)
    }
  }
}
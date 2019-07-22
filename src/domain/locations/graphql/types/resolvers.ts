import LocationService from '../../service'

const service = new LocationService()

export default {
  Location: {
    energy_info: async (obj: any, args: any, context: any) => {
      return await service.getEnergyInfo()
    },
    savings_info: async (obj: any, args: any, context: any) => {
      return await service.getSavingsInfo()
    }
  }
}
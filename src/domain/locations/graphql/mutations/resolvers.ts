import LocationService from '../../service'

const service = new LocationService()

export default {
  createLocation: async (obj: any, args: any, context: any) => {
    return await service.createLocation(
      args.name,
      args.neurio_sensor_id,
      args.power_company_id,
      args.billing_cycles,
      args.thermostats,
      args.bank
    )
  }
}
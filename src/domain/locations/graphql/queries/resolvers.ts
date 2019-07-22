import LocationService from "../../service";

const service = new LocationService()

export default {
  getLocation: async (obj: any, args: any, context: any) => {
    return await service.getLocation(args.location_id)
  }
}
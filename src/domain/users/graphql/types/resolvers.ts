import LocationService from '../../../locations/service'

const locationService = new LocationService()

export default {
  User: {
    locations: async (obj: any, args: any) => {
      return await locationService.getLocationsForUser(obj.user_id)
    }
  }
}
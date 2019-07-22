import LocationRepository from '../repository'
import Location from '../models'

export default class {
  repository: LocationRepository

  constructor() {
    this.repository = new LocationRepository()
  }

  getLocation(location_id: string): Promise<Location> {
    return this.repository.getLocation(location_id)
  }
}
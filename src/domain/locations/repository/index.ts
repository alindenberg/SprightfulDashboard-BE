import { getCollection } from "../../../database";
import Location from '../models'

export default class {
  private collection_name: string
  constructor() {
    this.collection_name = 'locations'
  }

  getLocation(location_id: string): Promise<Location> {
    return getCollection(this.collection_name).findOne({ location_id: location_id })
  }

  createLocation(location: Location): Promise<Location> {
    return getCollection(this.collection_name).insertOne(location).then(() => location)
  }

  deleteLocation(location_id: string): Promise<boolean> {
    return getCollection(this.collection_name).deleteOne({ location_id: location_id })
      .then(res => res.deletedCount == 1)
  }
}
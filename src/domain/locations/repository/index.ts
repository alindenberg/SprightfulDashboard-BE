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
}
import { getCollection } from "../../../database";
import Location, { Bank, BillingCycle } from '../models'

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
  updateLocationBank(location_id: string, bank: Bank): Promise<boolean> {
    return getCollection(this.collection_name).updateOne({ location_id: location_id }, { '$set': { 'bank': bank } }).then(res => res.modifiedCount == 1)
  }
  updateLocationBillingCycles(location_id: string, billing_cycles: BillingCycle[]): Promise<boolean> {
    return getCollection(this.collection_name).updateOne({ location_id: location_id }, { '$set': { 'billing_cycles': billing_cycles } }).then(res => res.modifiedCount == 1)
  }
  getLocationsForUser(user_id: string): Promise<Location[]> {
    return getCollection(this.collection_name).find({ owner_id: user_id }).toArray()
  }
}
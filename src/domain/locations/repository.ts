import { getCollection } from "../../database";
import Location, { Bank, BillingCycle } from './models'

export default class {
  private collection_name: string
  constructor() {
    this.collection_name = 'locations'
  }

  get_locations(): Promise<Location[]> {
    return getCollection(this.collection_name).find().toArray()
  }
  get_locations_for_user(userId: string): Promise<Location[]> {
    return getCollection(this.collection_name).find({ owner_id: userId }).toArray()
  }
  get_location(location_id: string): Promise<Location> {
    return getCollection(this.collection_name).findOne({ location_id: location_id })
  }
  create_location(location: Location): Promise<Location> {
    return getCollection(this.collection_name).insertOne(location).then(() => location)
  }
  delete_location(location_id: string): Promise<boolean> {
    return getCollection(this.collection_name).deleteOne({ location_id: location_id })
      .then((res: any) => res.deletedCount == 1)
  }
  update_location_bank(location_id: string, bank: Bank): Promise<boolean> {
    return getCollection(this.collection_name).updateOne({ location_id: location_id }, { '$set': { 'bank': bank } }).then(res => res.modifiedCount == 1)
  }
  update_location_billing_cycles(location_id: string, billing_cycles: BillingCycle[]): Promise<boolean> {
    return getCollection(this.collection_name).updateOne({ location_id: location_id }, { '$set': { 'billing_cycles': billing_cycles } }).then(res => res.modifiedCount == 1)
  }
  get_user_locations(user_id: string): Promise<Location[]> {
    return getCollection(this.collection_name).find({ owner_id: user_id }).toArray()
  }
}
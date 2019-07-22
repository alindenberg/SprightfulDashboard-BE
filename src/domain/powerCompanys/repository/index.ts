import PowerCompany from "../models";
import { getCollection } from '../../../database'

export default class {
  collection_name: string
  constructor() {
    this.collection_name = 'powerCompanys'
  }

  getPowerCompany(power_company_id: string): Promise<PowerCompany> {
    return getCollection(this.collection_name).findOne({ power_company_id: power_company_id })
      .then(powerCompany => powerCompany)
  }

  createPowerCompany(powerCompany: PowerCompany): Promise<PowerCompany> {
    return getCollection(this.collection_name).insertOne(powerCompany)
      .then(() => powerCompany)
  }

  updatePowerCompany(powerCompany: PowerCompany): Promise<PowerCompany> {
    return getCollection(this.collection_name).replaceOne({ power_company_id: powerCompany.power_company_id }, powerCompany)
      .then(() => powerCompany)
  }

  deletePowerCompany(power_company_id: string): Promise<Boolean> {
    return getCollection(this.collection_name).deleteOne({ power_company_id: power_company_id })
      .then(res => res.deletedCount == 1)
  }
}
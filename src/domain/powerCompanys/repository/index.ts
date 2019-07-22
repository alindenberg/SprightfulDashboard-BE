import { PowerCompany } from "../models";
import { getCollection } from '../../../database'

export default class {
  collectionName: string
  constructor() {
    this.collectionName = 'powerCompanys'
  }

  getPowerCompany(power_company_id: string): Promise<PowerCompany> {
    return getCollection(this.collectionName).findOne({ power_company_id: power_company_id })
      .then(powerCompany => powerCompany)
  }

  createPowerCompany(powerCompany: PowerCompany): Promise<PowerCompany> {
    return getCollection(this.collectionName).insertOne(powerCompany)
      .then(() => powerCompany)
  }

  updatePowerCompany(powerCompany: PowerCompany): Promise<PowerCompany> {
    return getCollection(this.collectionName).replaceOne({ power_company_id: powerCompany.power_company_id }, powerCompany)
      .then(() => powerCompany)
  }

  deletePowerCompany(power_company_id: string): Promise<Boolean> {
    return getCollection(this.collectionName).deleteOne({ power_company_id: power_company_id })
      .then(res => res.deletedCount == 1)
  }
}
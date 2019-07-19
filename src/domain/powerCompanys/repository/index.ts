import { PowerCompany } from "../models";
import Database from '../../../database'

export default class {
  db: Database
  collectionName: string
  constructor() {
    this.db = new Database()
    this.collectionName = 'powerCompanys'
  }
  getPowerCompany(power_company_id: string): Promise<PowerCompany> {
    return this.db.getCollection(this.collectionName).findOne({ power_company_id: power_company_id })
      .then(powerCompany => powerCompany)
  }

  createPowerCompany(powerCompany: PowerCompany): Promise<PowerCompany> {
    return this.db.getCollection(this.collectionName).insertOne(powerCompany)
      .then(() => powerCompany)
  }
}
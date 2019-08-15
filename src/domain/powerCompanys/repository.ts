import PowerCompany from './models';
import { getCollection } from '../../database'

export default class {
  collection_name: string
  constructor() {
    this.collection_name = 'powerCompanys'
  }

  get_power_company(power_company_id: string): Promise<PowerCompany> {
    return getCollection(this.collection_name).findOne({ power_company_id: power_company_id })
      .then((powerCompany: PowerCompany) => powerCompany)
  }

  create_power_company(powerCompany: PowerCompany): Promise<PowerCompany> {
    return getCollection(this.collection_name).insertOne(powerCompany)
      .then(() => powerCompany)
  }

  update_power_company(powerCompany: PowerCompany): Promise<PowerCompany> {
    return getCollection(this.collection_name).replaceOne({ power_company_id: powerCompany.power_company_id }, powerCompany)
      .then(() => powerCompany)
  }

  delete_power_company(power_company_id: string): Promise<Boolean> {
    return getCollection(this.collection_name).deleteOne({ power_company_id: power_company_id })
      .then((res: any) => res.deletedCount == 1)
  }
}
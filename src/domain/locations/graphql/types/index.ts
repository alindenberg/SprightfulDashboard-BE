import { gql } from 'apollo-server-express'

const LocationTypes = gql`
  type Location {
    location_id: String
    owner_id: String
    name: String
    neurio_sensor_id: String
    power_company_id: String
    power_company: PowerCompany
    billing_cycles: [BillingCycle]
    thermostats: [String]
    bank: Bank
    neurio_info(start_date: String!, end_date: String!): [NeurioInfo]
    fpl_info: [FplInfo]
  }
  type BillingCycle {
    start_date: String
    end_date: String
    bub: Float
  }
  type Bank {
    off_peak_hours: Float
    on_peak_hours: Float
    flat_rate_hours: Float
  }
  type NeurioInfo {
    consumptionEnergy: String
    generationEnergy: String
    importedEnergy: String
    exportedEnergy: String
    submeters: [NeurioSubmeters]
    start: String
    end: String
  }
  type NeurioSubmeters {
    energy: Int
    name: String
    channelNumber: Int
  }
  type FplInfo {
    readingTo: String
    readingFrom: String
    onPeakConsumption: Int
    offPeakConsumption: Int
    onPeakDemand: Int
    serviceDays: Int
    kwhUsed: Int
    maximumDemand: Int
    billingCharge: Float
    billingMonth: String
    billingYear: String
    temperature: Int
  }

  input BillingCycleInput {
    start_date: String!
    end_date: String!
    bub: Float!
  }
  input BankInput {
    off_peak_hours: Float!
    on_peak_hours: Float!
    flat_rate_hours: Float!
  }
`

export default LocationTypes
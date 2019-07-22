import { gql } from 'apollo-server-express'

const LocationTypes = gql`
  type Location {
    location_id: String
    name: String
    neurio_sensor_id: String
    power_company_id: String
    power_company: PowerCompany
    billing_cycles: [BillingCycle]
    thermostats: [String]
    bank: Bank
    savings_info(start_date: String, end_date: String): SavingsInfo
    energy_info(start_date: String, end_date: String): EnergyInfo
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
  type SavingsInfo {
    amount: String
  }
  type EnergyInfo {
    amount: String
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
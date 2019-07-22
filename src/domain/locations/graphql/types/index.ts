import { gql } from 'apollo-server-express'

const LocationTypes = gql`
  type Location {
    location_name: String
    neurio_sensor_id: String
    power_company_id: String
    power_company: PowerCompany
    billing_cycles: [BillingCycle]
    thermostats: [String]
    bank: Bank
    savings_info: SavingsInfo
    energy_info: EnergyInfo
  }
  type BillingCycle {
    name: String
    start_time: Float
    end_time: Float
    start_date: String
    end_date: String
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
`

export default LocationTypes
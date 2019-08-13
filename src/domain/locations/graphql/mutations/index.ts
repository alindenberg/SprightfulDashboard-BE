import { gql } from 'apollo-server-express'

const LocationMutations = gql`
  extend type Mutation {
    createLocation(
      name: String!
      owner_id: String!
      neurio_sensor_id: String!
      fpl_id: String!
      power_company_id: String!
      billing_cycles: [BillingCycleInput!]!
      thermostats: [String]
      bank: BankInput!
    ): Location
    
    deleteLocation(location_id: String!): Boolean

    updateLocationBank(location_id: String!, bank: BankInput!): Boolean

    updateLocationBillingCycles(location_id: String!, billing_cycles: [BillingCycleInput!]!): Boolean
  }
`

export default LocationMutations
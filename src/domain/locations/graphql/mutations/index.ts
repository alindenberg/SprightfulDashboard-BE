import { gql } from 'apollo-server-express'

const LocationMutations = gql`
  extend type Mutation {
    createLocation(
      name: String!
      neurio_sensor_id: String!
      power_company_id: String!
      billing_cycles: [BillingCycleInput!]!
      thermostats: [String]
      bank: BankInput!
    ): Location
  }
`

export default LocationMutations
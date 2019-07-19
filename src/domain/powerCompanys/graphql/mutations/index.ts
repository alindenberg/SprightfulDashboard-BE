import { gql } from 'apollo-server-express'

const PowerCompanyMutations = gql`
  extend type Mutation {
    createPowerCompany(
      name              :String!
      abbreviated_name  :String!
      rates             :PowerCompanyRatesInput!
      peaks             :[PowerCompanyPeakInput!]!
    ): PowerCompany
  }
`

export default PowerCompanyMutations
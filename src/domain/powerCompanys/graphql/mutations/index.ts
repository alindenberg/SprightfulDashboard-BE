import { gql } from 'apollo-server-express'

const PowerCompanyMutations = gql`
  extend type Mutation {
    createPowerCompany(
      name              :String!
      abbreviated_name  :String!
      rates             :PowerCompanyRatesInput!
      peaks             :[PowerCompanyPeakInput!]!
    ): PowerCompany

    updatePowerCompany(
      power_company_id  :String!
      name              :String!
      abbreviated_name  :String!
      rates             :PowerCompanyRatesInput!
      peaks             :[PowerCompanyPeakInput!]!
    ): PowerCompany

    deletePowerCompany(power_company_id: String!): Boolean
  } 
`

export default PowerCompanyMutations
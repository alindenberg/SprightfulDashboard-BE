import { gql } from 'apollo-server-express'

const PowerCompanyQueries = gql`
  extend type Query {
    getPowerCompany(power_company_id: String!): PowerCompany
  }
`

export default PowerCompanyQueries
import { gql } from 'apollo-server-express'

const PowerCompanyQueries = gql`
  type Query {
    getPowerCompany(power_company_id: String!): PowerCompany
  }
`

export default PowerCompanyQueries
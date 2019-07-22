import { gql } from 'apollo-server-express'

const LocationQueries = gql`
  extend type Query {
    getLocation(location_id: String!): Location
  }
`

export default LocationQueries
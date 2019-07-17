import { gql } from 'apollo-server-express'

const UserQueries = gql`
  type Query {
    getUser(first_name: String): User
  }
`

export default UserQueries
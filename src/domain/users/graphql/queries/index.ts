import { gql } from 'apollo-server-express'

const UserQueries = gql`
  type Query {
    getUser(user_id: String!): User
    getAllUsers: [User]
  }
`

export default UserQueries
import { gql } from 'apollo-server-express'

const UserQueries = gql`
  type Query {
    getUser: User
  }
`

export default UserQueries
import { gql } from 'apollo-server-express'

const UserMutations = gql`
  type Mutation {
    createUser(first_name: String!, last_name: String!, email: String!): User
  }
`

export default UserMutations
import { gql } from 'apollo-server-express'

const UserMutations = gql`
  type Mutation {
    createUser(
      first_name: String!
      last_name: String!
      email: String!
      password: String!
    ): User

    updateUser(
      user_id: String!
      first_name: String!
      last_name: String!
      email: String!
    ): User

    deleteUser(user_id: String!): Boolean
  }
`

export default UserMutations
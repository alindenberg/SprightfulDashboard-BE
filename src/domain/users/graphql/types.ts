import { gql } from 'apollo-server-express';

const UserTypes = gql`
  type User {
    first_name  :String
    last_name   :String
    email       :String
  }
`;

export default UserTypes
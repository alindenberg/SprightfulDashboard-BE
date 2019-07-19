import { gql } from 'apollo-server-express';

const UserTypes = gql`
  type User {
    user_id       :String
    first_name    :String
    last_name     :String
    email         :String
    locations     :[String]
    ecobee_tokens :String
  }
`;

export default UserTypes
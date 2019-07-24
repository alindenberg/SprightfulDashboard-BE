import { gql } from 'apollo-server-express';

const UserTypes = gql`
  type User {
    user_id       :String
    first_name    :String
    last_name     :String
    email         :String
    locations     :[Location]
    ecobee_tokens :UserEcobeeTokens
  }

  type UserEcobeeTokens {
    access_token  :String
    refresh_token :String
  }
`;

export default UserTypes
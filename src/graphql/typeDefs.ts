import UserTypes from '../domain/users/graphql/types'
import UserQueries from '../domain/users/graphql/queries'
import UserMutations from '../domain/users/graphql/mutations'
import PowerCompanyTypes from '../domain/powerCompanys/graphql/types'
import PowerCompanyQueries from '../domain/powerCompanys/graphql/queries'
import PowerCompanyMutations from '../domain/powerCompanys/graphql/mutations/index'
import LocationTypes from '../domain/locations/graphql/types'
import LocationQueries from '../domain/locations/graphql/queries'
import LocationMutations from '../domain/locations/graphql/mutations'

export default [
  UserTypes,
  UserQueries,
  UserMutations,
  PowerCompanyTypes,
  PowerCompanyQueries,
  PowerCompanyMutations,
  LocationTypes,
  LocationQueries,
  LocationMutations
]
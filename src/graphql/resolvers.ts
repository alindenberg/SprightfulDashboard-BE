import UserQueryResolvers from '../domain/users/graphql/queries/resolvers'
import UserMutationResolvers from '../domain/users/graphql/mutations/resolvers'
import UserTypeResolvers from '../domain/users/graphql/types/resolvers'
import PowerCompanyQueryResolvers from '../domain/powerCompanys/graphql/queries/resolvers'
import PowerCompanyMutationResolvers from '../domain/powerCompanys/graphql/mutations/resolvers'
import LocationQueryResolvers from '../domain/locations/graphql/queries/resolvers'
import LocationMutationResolvers from '../domain/locations/graphql/mutations/resolvers'
import LocationTypeResolvers from '../domain/locations/graphql/types/resolvers'

export default {
  Mutation: {
    ...UserMutationResolvers,
    ...PowerCompanyMutationResolvers,
    ...LocationMutationResolvers
  },
  Query: {
    ...UserQueryResolvers,
    ...PowerCompanyQueryResolvers,
    ...LocationQueryResolvers
  },
  ...UserTypeResolvers,
  ...LocationTypeResolvers
}
import UserQueryResolvers from '../domain/users/graphql/queries/resolvers'
import UserMutationResolvers from '../domain/users/graphql/mutations/resolvers'
import PowerCompanyQueryResolvers from '../domain/powerCompanys/graphql/queries/resolvers'
import PowerCompanyMutationResolvers from '../domain/powerCompanys/graphql/mutations/resolvers'
import LocationQueryResolvers from '../domain/locations/graphql/queries/resolvers'

export default {
  Mutation: {
    ...UserMutationResolvers,
    ...PowerCompanyMutationResolvers
  },
  Query: {
    ...UserQueryResolvers,
    ...PowerCompanyQueryResolvers,
    ...LocationQueryResolvers
  }
}
import UserService from '../service'

const service = new UserService()

export default {
  Query: {
    getUser: async (obj: any, args: any, context: any) => {
      return await service.getUser(args.first_name)
    }
  },
  Mutation: {
    createUser: async (obj: any, args: any, context: any) => {
      return await service.createUser(
        args.first_name,
        args.last_name,
        args.email
      )
    }
  }
}
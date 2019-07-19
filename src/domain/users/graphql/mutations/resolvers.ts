import UserService from '../../service'

const service = new UserService()

export default {
  createUser: async (obj: any, args: any, context: any) => {
    return await service.createUser(
      args.first_name,
      args.last_name,
      args.email
    )
  },
  updateUser: async (obj: any, args: any, context: any) => {
    return await service.updateUser(
      args.user_id,
      args.first_name,
      args.last_name,
      args.email
    )
  },
  deleteUser: async (obj: any, args: any, context: any) => {
    return await service.deleteUser(args.user_id)
  }
}
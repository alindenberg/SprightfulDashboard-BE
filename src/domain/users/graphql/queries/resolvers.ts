import UserService from '../../service'

const service = new UserService()

export default {
  getUser: async (obj: any, args: any, context: any) => {
    return await service.getUser(args.user_id)
  },
  getAllUsers: async (obj: any, args: any, context: any) => {
    return await service.getAllUsers()
  }
}
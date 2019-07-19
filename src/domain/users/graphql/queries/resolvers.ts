import UserService from '../../service'

const service = new UserService()

export default {
  getUser: async (obj: any, args: any, context: any) => {
    console.log("GET USER RESOLVER")
    return await service.getUser(args.user_id)
  },
  getAllUsers: async (obj: any, args: any, context: any) => {
    console.log("GET ALL USERS RESOLVER")
    return await service.getAllUsers()
  }
}
import User, { LoginResponse, UserProfile } from './models'
import UserService from './service'

export default class {
  service: UserService
  constructor() {
    this.service = new UserService()
  }
  get_users(): Promise<User[]> {
    return this.service.get_users()
  }
  get_user(req: any): Promise<UserProfile> {
    return this.service.get_user(req.params.user_id)
  }
  create_user(req: any): Promise<UserProfile> {
    return this.service.create_user(req.body.first_name, req.body.last_name, req.body.email)
  }
  update_user_email(req: any): Promise<boolean> {
    return this.service.update_user_email(req.params.user_id, req.body.email)
  }
  delete_user(req: any): Promise<boolean> {
    return this.service.delete_user(req.params.user_id)
  }
  login(req: any): Promise<LoginResponse> {
    return this.service.login(req.body.email, req.body.password)
  }
}
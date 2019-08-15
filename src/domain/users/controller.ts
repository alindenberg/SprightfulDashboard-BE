import User from './models'
import UserService from './service'

export default class {
  service: UserService
  constructor() {
    this.service = new UserService()
  }
  get_users(): Promise<User[]> {
    return this.service.get_users()
  }
  get_user(req: any): Promise<User> {
    return this.service.get_user(req.params.user_id)
  }
  create_user(req: any): Promise<User> {
    return this.service.create_user(req.body.name, req.body.fpl_id, req.body.sensor_id, req.body.password)
  }
  update_user(req: any): Promise<User> {
    return this.service.update_user(req.params.user_id, req.body.name, req.body.fpl_id, req.body.sensor_id)
  }
  delete_user(req: any): Promise<boolean> {
    return this.service.delete_user(req.params.user_id)
  }
}
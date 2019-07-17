import User from '../types'
import UserRepository from '../repository'

export default class {
  private repository: UserRepository
  constructor() {
    this.repository = new UserRepository()
  }
  getUser(user_id: string): Promise<User> {
    // TODO: Validation on user_id i.e. make sure not null or malformed
    return this.repository.getUser(user_id)
  }

  createUser(first_name: string, last_name: string, email: string) {
    const user = new User(first_name, last_name, email)
    return this.repository.createUser(user)
  }
}
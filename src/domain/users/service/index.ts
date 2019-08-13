import uuidv4 from 'uuid/v4'
import User from '../models'
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

  getAllUsers(): Promise<User[]> {
    return this.repository.getAllUsers()
  }

  createUser(first_name: string, last_name: string, email: string, password: string): Promise<User> {
    const user = new User(uuidv4(), first_name, last_name, email, password)
    return this.repository.createUser(user)
  }

  async updateUser(user_id: string, first_name: string, last_name: string, email: string): Promise<User> {
    let user = await this.getUser(user_id)

    // Update properties aside from id & password
    user.first_name = first_name
    user.last_name = last_name
    user.email = email

    return this.repository.updateUser(user)
  }

  deleteUser(user_id: string): Promise<boolean> {
    return this.repository.deleteUser(user_id)
  }
}
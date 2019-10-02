import uuidv4 from 'uuid/v4'
import crypto from 'crypto'
import User from './models'
import UserRepository from './repository'
import { generate_jwt } from '../../shared/service'

export default class {
  private repository: UserRepository
  constructor() {
    this.repository = new UserRepository()
  }
  get_user(user_id: string): Promise<User> {
    // TODO: Validation on user_id i.e. make sure not null or malformed
    return this.repository.get_user(user_id)
  }
  get_users(): Promise<User[]> {
    return this.repository.get_users()
  }
  create_user(first_name: string, last_name: string, email: string, password: string, locations: string[]): Promise<User> {
    const user = new User(uuidv4(), first_name, last_name, email, this.hash_password(password), locations)
    return this.repository.create_user(user)
  }
  update_user(user_id: string, first_name: string, last_name: string, email: string): Promise<User> {
    return this.get_user(user_id).then(async (user) => {
      // Update properties aside from id & password
      user.first_name = first_name
      user.last_name = last_name
      user.email = email

      return await this.repository.update_user(user)
    })
  }
  delete_user(user_id: string): Promise<boolean> {
    return this.repository.delete_user(user_id)
  }
  login(email: string, password: string): Promise<string> {
    return this.repository.login(email, this.hash_password(password)).then(() => {
      return generate_jwt()
    })
  }
  private hash_password(password: string): string {
    return crypto.createHash('sha256').update(password).digest('base64')
  }
}
import uuidv4 from 'uuid/v4'
import crypto from 'crypto'
import User, { LoginResponse, UserProfile } from './models'
import UserRepository from './repository'
import { generate_jwt } from '../../shared/service'

export default class {
  private repository: UserRepository
  constructor() {
    this.repository = new UserRepository()
  }
  get_user(user_id: string): Promise<UserProfile> {
    // TODO: Validation on user_id i.e. make sure not null or malformed
    return this.repository.get_user(user_id)
  }
  get_users(): Promise<User[]> {
    return this.repository.get_users()
  }
  create_user(first_name: string, last_name: string, email: string): Promise<UserProfile> {
    const user = new User(uuidv4(), first_name, last_name, email)
    return this.repository.create_user(user)
  }
  update_user_email(user_id: string, email: string): Promise<boolean> {
    return this.repository.update_user_email(user_id, email)
  }
  delete_user(user_id: string): Promise<boolean> {
    return this.repository.delete_user(user_id)
  }
  login(email: string, password: string): Promise<LoginResponse> {
    return this.repository.login(email, this.hash_password(password)).then((user_id: string) => {
      return new LoginResponse(user_id, generate_jwt())
    })
  }
  private hash_password(password: string): string {
    return crypto.createHash('sha256').update(password).digest('base64')
  }
}
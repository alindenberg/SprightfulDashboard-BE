import User from './models'
import { getCollection } from '../../database'

export default class {
  private collection_name: string
  constructor() {
    this.collection_name = 'users'
  }

  get_user(user_id: string): Promise<User> {
    return getCollection(this.collection_name).findOne({ user_id: user_id }).then(user => user)
  }
  get_users(): Promise<User[]> {
    return getCollection(this.collection_name).find().toArray()
  }
  create_user(user: User): Promise<User> {
    return getCollection(this.collection_name).insertOne(user).then(() => user)
  }
  update_user(user: User): Promise<User> {
    return getCollection(this.collection_name).replaceOne({ user_id: user.user_id }, user).then(() => user)
  }
  delete_user(user_id: string): Promise<boolean> {
    return getCollection(this.collection_name).deleteOne({ user_id: user_id }).then(((res) => res.deletedCount == 1))
  }
}
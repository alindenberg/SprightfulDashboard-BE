import User from '../models'
import { getCollection } from '../../../database'

export default class {
  private collection_name: string
  constructor() {
    this.collection_name = 'users'
  }

  getUser(user_id: string): Promise<User> {
    return getCollection(this.collection_name).findOne({ user_id: user_id }).then(user => user)
  }

  getAllUsers(): Promise<User[]> {
    return getCollection(this.collection_name).find().toArray()

  }

  createUser(user: User): Promise<User> {
    return getCollection(this.collection_name).insertOne(user).then(() => user)
  }

  deleteUser(user_id: string): Promise<boolean> {
    return getCollection(this.collection_name).deleteOne({ user_id: user_id }).then(((res) => res.deletedCount == 1))
  }
}
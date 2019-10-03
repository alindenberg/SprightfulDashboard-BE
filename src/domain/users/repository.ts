import User, { UserProfile } from './models'
import { getCollection } from '../../database'

export default class {
  private collection_name: string
  constructor() {
    this.collection_name = 'users'
  }

  get_user(user_id: string): Promise<UserProfile> {
    return getCollection(this.collection_name).findOne({ user_id: user_id }).then(user => user.profile)
  }
  get_users(): Promise<User[]> {
    return getCollection(this.collection_name).find().toArray()
  }
  create_user(user: User): Promise<UserProfile> {
    return getCollection(this.collection_name).insertOne(user).then(() => user.profile)
  }
  update_user_email(user_id: string, email: string): Promise<boolean> {
    return getCollection(this.collection_name).updateOne({ user_id: user_id }, { $set: { 'profile.email': email } }).then((res) => {
      if (res.modifiedCount != 1) {
        if (res.matchedCount == 0) {
          throw new Error(`No matching user for user id ${user_id}`)
        }
        throw new Error(`Failed to update user ${user_id}`)
      }
      return true
    })
  }
  delete_user(user_id: string): Promise<boolean> {
    return getCollection(this.collection_name).deleteOne({ user_id: user_id }).then(((res) => res.deletedCount == 1))
  }
  login(email: string, password: string): Promise<string> {
    return getCollection(this.collection_name).findOne({ 'profile.email': email }).then(document => {
      if (document == null) {
        throw new Error("No user found with supplied username")
      }
      else if (document.password == password) {
        return document.user_id
      }
      throw new Error("Incorrect password")
    })
  }
}
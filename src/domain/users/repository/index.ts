import { Db } from 'mongodb'

import User from '../models'

import Database from '../../../database'
import { cursorTo } from 'readline';

export default class {
  private db: Database
  constructor() {
    this.db = new Database()
  }

  getUser(user_id: string): Promise<User> {
    return this.db.getCollection('users').findOne({ user_id: user_id }).then(user => user)
  }

  getAllUsers(): Promise<User[]> {
    return this.db.getCollection('users').find().toArray()

  }

  createUser(user: User): Promise<User> {
    return this.db.getCollection('users').insertOne(user).then(() => user)
  }

  deleteUser(user_id: string): Promise<boolean> {
    return this.db.getCollection('users').deleteOne({ user_id: user_id }).then(((res) => res.deletedCount == 1))
  }
}
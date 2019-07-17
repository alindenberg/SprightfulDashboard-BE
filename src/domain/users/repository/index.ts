import { Db } from 'mongodb'

import User from '../types'

import Database from '../../../database'
import { cursorTo } from 'readline';

export default class {
  private db: Database
  constructor() {
    this.db = new Database()
  }

  getUser(first_name: string): Promise<User> {
    return this.db.getCollection('users').findOne({ first_name: first_name }).then(user => user)
  }

  getAllUsers(): Promise<User[]> {
    return this.db.getCollection('users').find().toArray()

  }

  createUser(user: User): Promise<User> {
    return this.db.getCollection('users').insertOne(user).then(() => user)
  }
}
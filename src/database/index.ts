import { MongoClient, Db, Collection } from 'mongodb'

export default class {
  private db: Db;

  constructor() {
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
      if (err) {
        console.log("Error connecting to mongo: ", err)
        throw err
      }
      this.db = client.db('sprightful_dashboard')
    })
  }

  getCollection(collection: string): Collection {
    return this.db.collection(collection)
  }
}

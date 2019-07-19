export default class User {

  user_id: string
  first_name: string
  last_name: string
  email: string

  constructor(user_id: string, first_name: string, last_name: string, email: string) {
    this.user_id = user_id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
  }

  getName() {
    console.log(`Name: ${this.first_name} ${this.last_name}`)
  }
}
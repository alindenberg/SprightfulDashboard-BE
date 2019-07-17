export default class User {
  constructor(first_name: string, last_name: string, email: string) {
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
  }

  first_name: string
  last_name: string
  email: string

  getName() {
    console.log(`Name: ${this.first_name} ${this.last_name}`)
  }
}
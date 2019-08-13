import crypto from 'crypto'

export default class User {
  user_id: string
  first_name: string
  last_name: string
  password: string
  email: string
  ecobee_tokens: UserEcobeeTokens

  constructor(user_id: string, first_name: string, last_name: string, email: string, password: string) {
    this.user_id = user_id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.password = crypto.createHash('sha256').update(password).digest("base64")
  }

  getName() {
    console.log(`Name: ${this.first_name} ${this.last_name}`)
  }
}

class UserEcobeeTokens {
  access_token: string
  refresh_token: string

  constructor(access_token: string, refresh_token: string) {
    this.access_token = access_token
    this.refresh_token = refresh_token
  }
}
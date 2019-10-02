export default class User {
  user_id: string
  first_name: string
  last_name: string
  password: string
  email: string
  locations: string[]
  ecobee_tokens: UserEcobeeTokens

  constructor(user_id: string, first_name: string, last_name: string, email: string, password: string, locations: string[]) {
    this.user_id = user_id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.password = password
    this.locations = locations
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

export class LoginResponse {
  user_id: string
  jwt: string

  constructor(user_id: string, jwt: string) {
    this.user_id = user_id
    this.jwt = jwt
  }
}

export class CostBreakdown {
  on_peak_energy_generated: number
  on_peak_energy_consumed: number
  off_peak_energy_generated: number
  off_peak_energy_consumed: number
  total_generation: number
  total_consumption: number
  on_peak_price: number
  off_peak_price: number
  flat_rate_price: number
  total_tou_price: number
  total_flat_rate_price: number

  constructor(
    on_peak_energy_generated: number,
    on_peak_energy_consumed: number,
    off_peak_energy_generated: number,
    off_peak_energy_consumed: number,
    on_peak_price: number,
    off_peak_price: number,
    flat_rate_price: number,
    base_charge: number
  ) {
    this.on_peak_energy_generated = on_peak_energy_generated
    this.on_peak_energy_consumed = on_peak_energy_consumed
    this.off_peak_energy_generated = off_peak_energy_generated
    this.off_peak_energy_consumed = off_peak_energy_consumed
    this.total_generation = Number(on_peak_energy_generated) + Number(off_peak_energy_generated)
    this.total_consumption = Number(on_peak_energy_consumed) + Number(off_peak_energy_consumed)
    this.on_peak_price = on_peak_price
    this.off_peak_price = off_peak_price
    this.flat_rate_price = flat_rate_price
    this.total_tou_price = Number(base_charge) + Number(on_peak_price + Number(off_peak_price))
    this.total_flat_rate_price = Number(base_charge) + Number(flat_rate_price)
  }
}
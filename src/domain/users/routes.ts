import express from 'express'
import { validate_jwt, format_error_response } from '../../shared/service'
import UserController from './controller'
import { LoginResponse } from './models'

let router = express.Router()
let controller = new UserController()

router.get("/users", validate_jwt, async (_, res) => {
  await controller.get_users().then((users: any) => {
    res.status(200)
    res.send(users)
  }).catch((err: Error) => {
    console.log("Error getting all users ", err)
    res.status(400)
    res.send(format_error_response(err))
  })
})
router.post("/users/login", async (req, res) => {
  await controller.login(req).then((result: LoginResponse) => {
    res.status(200)
    res.send(result)
  }).catch((err: Error) => {
    console.log("Error logging in ", err)
    res.status(400)
    res.send(format_error_response(err))
  })
})
router.get("/users/:user_id", validate_jwt, async (req, res) => {
  await controller.get_user(req).then((user: any) => {
    res.status(200)
    res.send(user)
  }).catch((err: Error) => {
    console.log("Error getting user ", err.message)
    res.status(400)
    res.send(format_error_response(err))
  })
})
router.put("/users/:user_id/email", validate_jwt, async (req, res) => {
  await controller.update_user_email(req).then(() => {
    res.status(200)
    res.send(null)
  }).catch((err: Error) => {
    console.log("Error getting user ", err.message)
    res.status(400)
    res.send(format_error_response(err))
  })
})
router.post("/users", validate_jwt, async (req, res) => {
  await controller.create_user(req).then((result) => {
    res.status(200)
    res.send(result)
  }).catch((err: Error) => {
    console.log("Error adding user ", err.message)
    res.status(400)
    res.send(format_error_response(err))
  })
})
router.delete("/users/:user_id", validate_jwt, async (req, res) => {
  await controller.delete_user(req).then(() => {
    res.send(null)
    res.status(200)
  }).catch((err: Error) => {
    res.status(400)
    res.send(format_error_response(err))
  })
})

export default router
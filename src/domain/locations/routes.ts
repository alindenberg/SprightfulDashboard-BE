import express from 'express'
import LocationController from './controller'
import { validate_jwt, format_error_response } from '../../shared/service'
import { FplData, EnergyInfo } from '../../shared/models';
import Location from './models';
// import { validate_jwt } from '../../auth/service'

let router = express.Router()
const controller = new LocationController()

router.post("/locations", validate_jwt, async (req, res) => {
  await controller.create_location(req).then((result: Location) => {
    res.status(200)
    res.send(result)
  }).catch((err: Error) => {
    console.log("Error adding location ", err.message)
    res.status(400)
    res.send(format_error_response(err))
  })
})
router.get('/locations', validate_jwt, async (req, res) => {
  await controller.get_locations(req).then((locations: Location[]) => {
    res.status(200)
    res.send(locations)
  }).catch((err: Error) => {
    res.status(400)
    res.send(format_error_response(err))
  })
})
router.get("/locations/:location_id", validate_jwt, async (req, res) => {
  await controller.get_location(req).then((user: any) => {
    res.status(200)
    res.send(user)
  }).catch((err: Error) => {
    console.log("Error getting user ", err.message)
    res.status(400)
    res.send(format_error_response(err))
  })
})
router.delete("/locations/:location_id", validate_jwt, async (req, res) => {
  await controller.delete_location(req).then(() => {
    res.send(null)
    res.status(200)
  }).catch((err: Error) => {
    res.status(400)
    res.send(format_error_response(err))
  })
})
router.get("/locations/:location_id/energy_info", validate_jwt, async (req, res) => {
  await controller.get_energy_info(req).then((result: EnergyInfo[]) => {
    res.status(200)
    res.send(result)
  }).catch((err: Error) => {
    console.log("Error getting neurio info ", err)
    res.status(400)
    res.send(format_error_response(err))
  })
})
router.get("/locations/:location_id/fpl_info", validate_jwt, async (req, res) => {
  await controller.get_fpl_info(req).then((result: FplData) => {
    res.status(200)
    res.send(result)
  }).catch((err: Error) => {
    console.log("Error getting FPL bill ", err)
    res.status(400)
    res.send(format_error_response(err))
  })
})
export default router
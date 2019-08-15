import express from 'express'
import LocationController from './controller'
import { format_error_response } from '../../shared/service'
import { FplData, NeurioData } from '../../shared/models';
import Location from './models';
// import { validate_jwt } from '../../auth/service'

let router = express.Router()
const controller = new LocationController()

router.post("/locations", async (req, res) => {
  await controller.create_location(req).then((result: Location) => {
    res.status(200)
    res.send(result)
  }).catch((err: Error) => {
    console.log("Error adding location ", err.message)
    res.status(400)
    res.send(format_error_response(err))
  })
})
router.get("/locations/:location_id", async (req, res) => {
  await controller.get_location(req).then((user: any) => {
    res.status(200)
    res.send(user)
  }).catch((err: Error) => {
    console.log("Error getting user ", err.message)
    res.status(400)
    res.send(format_error_response(err))
  })
})
router.delete("/locations/:location_id", async (req, res) => {
  await controller.delete_location(req).then(() => {
    res.send(null)
    res.status(200)
  }).catch((err: Error) => {
    res.status(400)
    res.send(format_error_response(err))
  })
})
router.get("/location/:location_id/neurio_info", async (req, res) => {
  await controller.get_neurio_info(req).then((result: NeurioData) => {
    res.status(200)
    res.send(result)
  }).catch((err: Error) => {
    console.log("Error getting cost breakdown ", err)
    res.status(400)
    res.send(format_error_response(err))
  })
})
router.get("/location/:location_id/fpl_info", async (req, res) => {
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
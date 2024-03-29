import express from 'express'
import PowerCompany from './models';
import PowerCompanyController from './controller'
import { validate_jwt, format_error_response } from '../../shared/service'

const router = express.Router()
const controller = new PowerCompanyController()

router.get('/power_companys/:power_company_id', validate_jwt, async (req, res) => {
  await controller.get_power_company(req).then((result: PowerCompany) => {
    res.status(200)
    res.send(result)
  }).catch((err: Error) => {
    console.log(`Error getting power company with id: ${req.params.power_company_id}. `, err)
    res.status(400)
    res.send(format_error_response(err))
  })
})
router.post('/power_companys', validate_jwt, async (req, res) => {
  await controller.create_power_company(req).then((result: PowerCompany) => {
    res.status(200)
    res.send(result)
  }).catch((err: Error) => {
    console.log("Error creating power company ", err)
    res.status(400)
    res.send(format_error_response(err))
  })
})

export default router
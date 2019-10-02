import LocationService from './service'
import Location from './models';
import { get_current_billing_cycle } from '../../shared/service'

export default class {
  service: LocationService
  constructor() {
    this.service = new LocationService()
  }

  create_location(req: any): Promise<Location> {
    return this.service.create_location(
      req.body.name,
      req.body.neurio_id,
      req.body.fpl_id,
      req.body.power_company_id,
      req.body.is_tou,
      req.body.billing_cycles,
      req.body.thermostats)
  }
  get_location(req: any) {
    return this.service.get_location(req.params.location_id)
  }
  get_locations(req: any) {
    return this.service.get_locations(req.query.userId)
  }
  delete_location(req: any) {
    return this.service.delete_location(req.params.location_id)
  }
  get_energy_info(req: any) {
    return this.service.get_location(req.params.location_id).then(async (location: Location) => {
      let start = null
      let end = null
      if (req.query.currentBillingCycle == 'true') {
        const billing_cycle = get_current_billing_cycle(location.billing_cycles)
        start = billing_cycle.start_date
        end = billing_cycle.end_date
      } else {
        start = req.query.start
        end = req.query.end
      }

      return await this.service.get_energy_info(
        location.neurio_sensor_id,
        location.power_company_id,
        start,
        end
      )
    })
  }
  get_fpl_info(req: any) {
    return this.service.get_location(req.params.location_id).then(async (loc) => {
      return await this.service.get_fpl_info(loc.fpl_id)
    })
  }
}
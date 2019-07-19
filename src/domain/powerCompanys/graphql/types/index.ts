import { gql } from 'apollo-server-express'

const PowerCompanyTypes = gql`
  type PowerCompany {
    power_company_id  :String
    name              :String
    abbreviated_name  :String
    rates             :PowerCompanyRates
    peaks             :[PowerCompanyPeak]
  }

  type PowerCompanyRates {
    base_charge     :Float
    flat_under      :Float
    flat_over       :Float
    on_peak_under   :Float
    on_peak_over    :Float
    off_peak_under  :Float
    off_peak_over   :Float
  }

  type PowerCompanyPeak {
    name            :String
    start_time      :String
    end_time        :String
    start_date      :String
    end_date        :String
  }

  input PowerCompanyRatesInput {
    base_charge     :Float
    flat_under      :Float
    flat_over       :Float
    on_peak_under   :Float
    on_peak_over    :Float
    off_peak_under  :Float
    off_peak_over   :Float
  }

  input PowerCompanyPeakInput {
    name            :String
    start_time      :String
    end_time        :String
    start_date      :String
    end_date        :String
  }
`

export default PowerCompanyTypes
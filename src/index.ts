import express from 'express'
import bodyParser from 'body-parser';
import { initDb } from './database';
import user_routes from './domain/users/routes'
import location_routes from './domain/locations/routes'
import power_company_routes from './domain/powerCompanys/routes'

const app = express()
app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Token");
  res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE");
  next();
});

app.use(user_routes)
app.use(location_routes)
app.use(power_company_routes)

const port = 4000
app.listen(port, () => {
  initDb()
  console.log(`Example app listening on port ${port}!`)
});
const express = require('express')
const Datastore = require('nedb')
const fetch = require('node-fetch')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 1234

app.listen(port, () => {
  console.log(`Starting servert at ${port}...`)
})

app.use(express.static('public'))
app.use(express.json())

const database = new Datastore({
  filename: 'database.db' /*, timestampData: true*/
})
database.loadDatabase()

app.get('/api', (request, response) => {
  database.find({}, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      response.json(data)
    }
  })
})

app.post('/api', (request, response) => {
  const data = request.body
  database.insert({
    ...data,
    timestamp: Date.now()
  })

  response.json({
    ...data,
    timestamp: Date.now()
  })
})

app.get('/weather/:latlon', async (request, response) => {
  const latlon = request.params.latlon.split(',')
  const lat = latlon[0]
  const lon = latlon[1]
  const weatherURL = `https://api.darksky.net/forecast/${process.env.API_KEY}/${lat},${lon}?units=si`
  const fetchResponse = await fetch(weatherURL)
  const data = await fetchResponse.json()
  response.json(data)
})

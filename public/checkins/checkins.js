const mymap = L.map('mapid').setView([52.5, 4.5], 6)
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contrinutors'
const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(TILE_URL, { attribution })
tiles.addTo(mymap)

async function getData() {
  const response = await fetch('/api')
  const data = await response.json()
  data.forEach(item => {
    // const root = document.createElement('div')
    // const geo = document.createElement('div')
    // const date = document.createElement('div')
    // const weather = document.createElement('div')
    // const hr = document.createElement('hr')
    // geo.textContent = `${item.lat}°, ${item.lon}°`
    // date.textContent = `${new Date(item.timestamp).toLocaleString()}`
    // weather.textContent = `The weather here is ${item.weather.summary} with a temperature of ${item.weather.temperature}°C.`
    // root.append(geo, date, weather, hr)
    // document.body.append(root)

    const { lat, lon, weather } = item
    const txt = `The weather here at ${lat}, ${lon} is ${weather.summary} with a temperature of ${weather.temperature}°C.`

    L.marker([lat, lon])
      .addTo(mymap)
      .bindPopup(txt)
  })
}

getData()

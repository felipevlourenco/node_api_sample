if ('geolocation' in navigator) {
  console.log('Geolocation availabe!')
  navigator.geolocation.getCurrentPosition(async position => {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    document.getElementById('lat').textContent = lat
    document.getElementById('lon').textContent = lon

    const weatherURL = `/weather/${lat},${lon}`

    const response = await fetch(weatherURL)
    const json = await response.json()

    const { summary, temperature } = json.currently
    document.getElementById('summary').textContent = summary
    document.getElementById('temperature').textContent = temperature
    sendData(json.currently)
  })
} else {
  console.log('Geolocation not available!')
}

async function sendData(weather) {
  const lat = document.getElementById('lat').textContent
  const lon = document.getElementById('lon').textContent
  const data = { lat, lon, weather }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  const response = await fetch('/api', options)
  const body = await response.json()
  console.log('TCL: body', body)
}

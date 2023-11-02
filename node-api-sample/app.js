const express = require('express')
const fetch = require('node-fetch')

const app = express()
const port = 8888

app.get('/', async (req, res) => {
  const response = await fetch('https://www.affirmations.dev/', {
    method: 'GET',
  })
  const data = await response.json()
  res.json(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

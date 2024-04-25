const express = require('express')
const cors = require('cors')
require('dotenv').config();
const PORT = process.env.PORT || 8300

const app = express()

app.use(cors())
app.use(express.json())

app.listen(PORT)

app.get('/', (req, res) => {
    res.send('CRUD IS RUNNER')
  })

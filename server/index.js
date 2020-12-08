const express = require('express')
const app = express()

const measurementRoute = require('./routes/data')

app.use(measurementRoute)

module.exports = app;

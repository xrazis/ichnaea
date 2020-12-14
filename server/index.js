const app = require('express')()
const server = require('http').createServer(app);
const chalk = require('chalk')

const redis = require('./connections/redis_conn')
const influx = require('./connections/influx_conn')
const socket = require('./services/socket')(server)

const measurementRoute = require('./routes/data')

app.use(measurementRoute)

server.listen(6000);
console.log(chalk.green.bold('Server listening on port 6000!'));
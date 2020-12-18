const {InfluxDB} = require('@influxdata/influxdb-client')
const chalk = require('chalk')

const {influx_url, influx_org, influx_bucket} = require('../config/keys')

const client = new InfluxDB({
    url: influx_url
});

const writeApi = client.getWriteApi(influx_org, influx_bucket, 's');

const queryApi = client.getQueryApi(influx_org);

console.log(chalk.greenBright.bold('Connected to influx!'))

module.exports = {writeApi, queryApi}
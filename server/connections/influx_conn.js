const {InfluxDB} = require('@influxdata/influxdb-client')
const chalk = require('chalk')

const {influx_uri, influx_token, influx_org, influx_bucket} = require('../config/keys')

const client = new InfluxDB({
    url: influx_uri,
    token: influx_token,
});

const write = client.getWriteApi(
    influx_org,
    influx_bucket
);

const queryApi = client.getQueryApi(influx_org);

console.log(chalk.greenBright.bold('Connected to influx!'))

module.exports = {write, queryApi}
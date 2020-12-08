const {InfluxDB} = require('@influxdata/influxdb-client')
const chalk = require('chalk')

const {url, token, org, bucket} = require('../config/dev')

const client = new InfluxDB({
    url: url,
    token: token,
});

const writeApi = client.getWriteApi(
    org,
    bucket
);

const queryApi = client.getQueryApi(org);
console.log(chalk.yellow('Initialized Database connection...'));

module.exports = {writeApi, queryApi}
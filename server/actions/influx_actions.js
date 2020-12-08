const {Point} = require('@influxdata/influxdb-client');
const chalk = require('chalk')

const {writeApi, queryApi} = require('../connections/db_conn')
const {bucket} = require('../config/dev')

write = (pointName, uuid, measurement) => {
    const point = new Point(pointName)
        .tag('client', uuid)
        .floatField('value', measurement);
    writeApi.writePoint(point);
    writeApi.flush().then(() => {
        console.log(chalk.gray('Flushed!'))
    });
}

closeWrite = () => {
    writeApi
        .close()
        .then(() => {
            console.log(chalk.magenta('Write finished'));
        })
        .catch((e) => {
            console.error(e);
            console.log(chalk.red('Write ERROR'));
        });
}

query = (timeFrame, filter) => {
    const query = `from(bucket: "${bucket}") |> range(start: -${timeFrame}) |> group(columns: ["client"])
      |> filter(fn: (r) => r._measurement == "${filter}")`;

    return queryApi
        .collectRows(query)
        .then(async (result) => {
        })
        .catch(() => {
            return [{Error: 'Error occured'}];
        });
}

module.exports = {write, closeWrite, query}

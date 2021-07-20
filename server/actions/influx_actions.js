const {Point} = require('@influxdata/influxdb-client');

const {writeApi, queryApi} = require('../connections/influx_conn');

iWrite = (pointName, uuid, measurement) => {
    const point = new Point(pointName)
        .tag('client', uuid)
        .floatField('value', measurement);
    writeApi.writePoint(point);
    writeApi.flush().then(() => {
    });
}

closeWrite = () => {
    writeApi
        .close()
        .then(() => {
            console.log('Write finished');
        })
        .catch((e) => {
            console.error(e);
            console.log('Write ERROR');
        });
}

iQuery = (query) => {
    return queryApi
        .collectRows(query)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return [{Error: `Error occurred: ${err}`}];
        });
}

module.exports = {iWrite, closeWrite, iQuery};

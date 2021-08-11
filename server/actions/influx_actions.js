const {Point} = require('@influxdata/influxdb-client');

const {writeApi, queryApi} = require('../connections/influx_conn');

iWrite = (data) => {
    const {pointName, uuid, temperature, pitch, roll, yaw, acceleration, inclination, orientation} = data;

    const imuPoint = new Point(pointName)
        .tag('client', uuid)
        .tag('sensor', 'IMU')
        .floatField('temperature', temperature)
        .floatField('pitch', pitch)
        .floatField('roll', roll)
        .floatField('yaw', yaw)
        .floatField('acceleration', acceleration)
        .floatField('inclination', inclination)
        .floatField('orientation', orientation);

    writeApi.writePoint(imuPoint);
    writeApi.flush().then();
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

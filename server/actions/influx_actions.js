const {Point} = require('@influxdata/influxdb-client');

const {writeApi, queryApi} = require('../connections/influx_conn');

iWrite = (data) => {
    const {pointName, uuid, temperature, accelerometer, gyroscope} = data;

    const tempPoint = new Point(pointName)
        .tag('client', uuid)
        .tag('sensor', 'thermometer')
        .floatField('temperature', temperature);

    const accPoint = new Point(pointName)
        .tag('client', uuid)
        .tag('sensor', 'accelerometer')
        .floatField('x', accelerometer.x)
        .floatField('y', accelerometer.y)
        .floatField('z', accelerometer.z)
        .floatField('pitch', accelerometer.pitch)
        .floatField('roll', accelerometer.roll)
        .floatField('acceleration', accelerometer.acceleration)
        .floatField('inclination', accelerometer.inclination)
        .floatField('orientation', accelerometer.orientation);

    const gyroPoint = new Point(pointName)
        .tag('client', uuid)
        .tag('sensor', 'gyroscope')
        .floatField('x', gyroscope.x)
        .floatField('y', gyroscope.y)
        .floatField('z', gyroscope.z)
        .floatField('pitch-rate', gyroscope.pitch.rate)
        .floatField('pitch-angle', gyroscope.pitch.angle)
        .floatField('roll-rate', gyroscope.roll.rate)
        .floatField('roll-angle', gyroscope.roll.angle)
        .floatField('yaw-rate', gyroscope.yaw.rate)
        .floatField('yaw-angle', gyroscope.yaw.angle)
        .floatField('rate-x', gyroscope.rate.x)
        .floatField('rate-y', gyroscope.rate.y)
        .floatField('rate-z', gyroscope.rate.z)
        .booleanField('isCalibrated', gyroscope.isCalibrated);

    writeApi.writePoint(tempPoint);
    writeApi.writePoint(accPoint);
    writeApi.writePoint(gyroPoint);
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

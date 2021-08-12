const {id} = require('../config/keys');
const samplingInterval = 0.1;
const gyroSens = 131;

let pitch = 0,
    roll = 0,
    yaw = 0;

function parseData(imu) {
    const {temperature, accelerometer, gyro} = imu;

    // Get pitch, roll, yaw from gyro
    pitch += (gyro.rate.x / gyroSens) * samplingInterval;
    roll -= (gyro.rate.y / gyroSens) * samplingInterval;
    yaw += (gyro.rate.z / gyroSens) * samplingInterval;

    // Only use accelerometer when forces are ~1g
    if (accelerometer.acceleration > -1 && accelerometer.acceleration < 2) {
        pitch =
            0.98 * pitch +
            0.02 * accelerometer.pitch;

        roll =
            0.98 * roll +
            0.02 * accelerometer.roll;
    }

    // Filter out noise (a small tremor appears with too many fraction digits)
    pitch = toFixed(pitch);
    roll = toFixed(roll);
    yaw = toFixed(yaw);

    return {
        pointName: 'IMU',
        uuid: id,
        temperature: temperature.celsius,
        pitch,
        roll,
        yaw,
        acceleration: imu.accelerometer.acceleration,
        inclination: imu.accelerometer.inclination,
        orientation: imu.accelerometer.orientation,
    }
}

function toFixed(arg) {
    return +arg.toFixed(2);
}

module.exports = {parseData};
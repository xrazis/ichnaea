const {createHash} = require('crypto');
const {Board, IMU} = require('johnny-five');
const io = require('socket.io-client');
const {server_url} = require('../config/keys');
const getMAC = require('getmac').default;

const socket = io(server_url);
const mac = getMAC();
const id = createHash('md5').update(mac).digest('hex');
let board;

const gravitationalAcceleration = 9.82;
const samplingInterval = 0.1;
const gyroSens = 131;

let pitch = 0,
    roll = 0,
    yaw = 0;

try {
    board = new Board({port: '/dev/ttyACM0', repl: false, debug: false});
} catch (e) {
    console.log('Arduino is probably not connected! Please connect device and restart program...');
    process.exit(1);
}

console.log(`
    ID: ${id}
    Use this ID, to adopt the athlete on the user dashboard.
`);

socket.on('connect', () => {
    console.log('Connected to server!');

    socket.emit('subscribe', JSON.stringify({subscribe: 'clients', id: id}));
});

socket.on('disconnect', (reason) => {
    console.log('Lost connection!');

    if (reason === 'io server disconnect') socket.connect();

    if (reason === 'io client disconnect') {
        console.log('Server kicked you!');
        process.exit(1);
    }

    console.log('Reconnecting...');
});

board.on('ready', () => {
    console.log('Board is ready!');

    const imu = new IMU({
        controller: 'MPU6050',
        freq: 100
    });

    imu.on('change', () => socket.volatile.emit('data', parseData(imu)));
});

board.on('close', () => {
    console.log('Board has been disconnected!');
});

function parseData(imu) {
    const {temperature, accelerometer, gyro} = imu;

    // console.log(accelerometer.orientation)

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
        // Not sure if this makes sense
        yaw =
            0.98 * yaw +
            0.02 * Math.atan2(accelerometer.z, Math.hypot(accelerometer.y, accelerometer.z));
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
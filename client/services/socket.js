const {createHash} = require('crypto');
const {Board, IMU} = require('johnny-five');
const io = require('socket.io-client');
const {server_url} = require('../config/keys');
const getMAC = require('getmac').default;

const socket = io(server_url);
const mac = getMAC();
const id = createHash('md5').update(mac).digest('hex');
let board;

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
    board.samplingInterval(1000);
    console.log('Board is ready!');

    const imu = new IMU({
        controller: 'MPU6050'
    });

    imu.on('change', () => {
        socket.volatile.emit('data', {
            pointName: 'IMU',
            uuid: id,
            temperature: imu.temperature.celsius,
            accelerometer: {
                x: imu.accelerometer.x,
                y: imu.accelerometer.y,
                z: imu.accelerometer.z,
                pitch: imu.accelerometer.pitch,
                roll: imu.accelerometer.roll,
                acceleration: imu.accelerometer.acceleration,
                inclination: imu.accelerometer.inclination,
                orientation: imu.accelerometer.orientation,
            },
            gyroscope: {
                x: imu.gyro.x,
                y: imu.gyro.y,
                z: imu.gyro.z,
                pitch: imu.gyro.pitch,
                roll: imu.gyro.roll,
                yaw: imu.gyro.yaw,
                rate: imu.gyro.rate,
                isCalibrated: imu.gyro.isCalibrated,
            }
        });
    });
});

board.on('close', () => {
    console.log('Board has been disconnected!');
});
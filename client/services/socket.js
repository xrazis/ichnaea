const {createHash} = require('crypto');
const {Board, IMU} = require('johnny-five');
const io = require('socket.io-client');
const {server_url} = require('../config/keys');
const getMAC = require('getmac').default;

const socket = io(server_url);
const mac = getMAC();
const id = createHash('md5').update(mac).digest('hex');
const board = new Board();

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
        exit(1);
    }

    console.log('Reconnecting...');
});

socket.on('closeConn', () => closeConn());

board.on('ready', () => {
    console.log('Board is ready!');

    const imu = new IMU({
        controller: 'MPU6050'
    });

    imu.on('change', () => {
        console.log('Thermometer');
        console.log('  celsius      : ', imu.thermometer.celsius);
        console.log('  fahrenheit   : ', imu.thermometer.fahrenheit);
        console.log('  kelvin       : ', imu.thermometer.kelvin);
        console.log('--------------------------------------');

        console.log('Accelerometer');
        console.log('  x            : ', imu.accelerometer.x);
        console.log('  y            : ', imu.accelerometer.y);
        console.log('  z            : ', imu.accelerometer.z);
        console.log('  pitch        : ', imu.accelerometer.pitch);
        console.log('  roll         : ', imu.accelerometer.roll);
        console.log('  acceleration : ', imu.accelerometer.acceleration);
        console.log('  inclination  : ', imu.accelerometer.inclination);
        console.log('  orientation  : ', imu.accelerometer.orientation);
        console.log('--------------------------------------');

        console.log('Gyroscope');
        console.log('  x            : ', imu.gyro.x);
        console.log('  y            : ', imu.gyro.y);
        console.log('  z            : ', imu.gyro.z);
        console.log('  pitch        : ', imu.gyro.pitch);
        console.log('  roll         : ', imu.gyro.roll);
        console.log('  yaw          : ', imu.gyro.yaw);
        console.log('  rate         : ', imu.gyro.rate);
        console.log('  isCalibrated : ', imu.gyro.isCalibrated);
        console.log('--------------------------------------');
    });
});

board.on('close', () => {
    console.log('Board has been disconnected!');
});


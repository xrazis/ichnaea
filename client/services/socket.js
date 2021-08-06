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
    console.log('Board is ready!');

    const imu = new IMU({
        controller: 'MPU6050',
        freq: 100
    });

    // IMU  MPU6050 Composition

    // Accelerator

    /*
     id	            A user definable id value. Defaults to a generated uid.
     zeroV	        The current zeroV value (or values). May be different from initial values if auto-calibrated.
     pins	        The pins defined for X, Y, and Z.
     pitch	        The pitch angle in degrees.
     roll	        The roll angle in degrees.
     x	            Value of x axis in G forces.
     y	            Value of y axis in G forces.
     z	            Value of z axis in G forces.
     acceleration	The magnitude of the acceleration in G forces.
     inclination	The incline of the device in degrees.
     orientation	The orientation of the device (-3, -2, -1, 1, 2, 3).
    */

    // GYRO

    /*
     id	            A user definable id value. Defaults to a generated uid.
     pins	        The pins defined for X, Y, and Z.
     isCalibrated	The calibration state of the device.
     pitch	        An object containing values for the pitch rate and angle.
     roll	        An object containing values for the roll rate and angle.
     yaw	        An object containing values for the yaw rate and angle.
     rate	        And object containing the rate values of X, Y, and Z.
     x	            Value of x axis.
     y	            Value of y axis.
     z	            Value of z axis.
    */

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
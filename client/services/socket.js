const {Board, IMU} = require('johnny-five');
const io = require('socket.io-client');
const {server_url, id} = require('../config/keys');
const {parseData} = require('../actions/imu_actions');

const socket = io(server_url);
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

    imu.on('change', () => socket.volatile.emit('data', parseData(imu)));
});

board.on('close', () => {
    console.log('Board has been disconnected!');
});
const {createHash} = require('crypto');
const io = require('socket.io-client');
const {server_url} = require('../config/keys');
const getMAC = require('getmac').default;

const socket = io(server_url);
const mac = getMAC();
const id = createHash('md5').update(mac).digest('hex');

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

setInterval(() => socket.emit('data', {
    measurement: Math.round(100 * Math.random()),
    id,
    pointName: 'test-measure'
}), 3 * 1000);

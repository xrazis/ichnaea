const io = require('socket.io-client');
const {server_url} = require('../config/keys');
const getMAC = require('getmac').default;

const socket = io(server_url);
const mac = getMAC();

console.log(`
    ID: ${mac}
    Use this ID, to adopt the athlete on the user dashboard.
`);

socket.on('connect', () => {
    console.log('Connected to server!');

    socket.emit('subscribe', JSON.stringify({subscribe: 'clients', id: mac}));
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

socket.on('closeConn', () => {
    closeConn();
});

setInterval(() => {
    socket.emit('data', {measurement: Math.round(100 * Math.random()), mac, pointName: 'test-measure'});
}, 3 * 1000);

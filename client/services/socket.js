const io = require('socket.io-client');
const chalk = require('chalk');
const {server_url} = require('../config/keys');
const getMAC = require('getmac').default;

const socket = io(server_url);
const mac = getMAC();

console.log(chalk.green(`
    ID: ${mac}
    Use this ID, to adopt the athlete on the user dashboard.
`));

socket.on('connect', () => {
    console.log(chalk.green('Connected to server!'));

    socket.emit('subscribe', JSON.stringify({subscribe: 'clients', mac}));
});

socket.on('disconnect', (reason) => {
    console.log(chalk.red('Lost connection!'));

    if (reason === 'io server disconnect') socket.connect();

    if (reason === 'io client disconnect') {
        console.log(chalk.red('Server kicked you!'));
        exit(1);
    }

    console.log(chalk.yellow('Reconnecting...'));
});

socket.on('closeConn', () => {
    closeConn();
});

setInterval(() => {
    socket.emit('data', {measurement: Math.round(100 * Math.random()), mac, pointName: 'test-measure'});
}, 3 * 1000);

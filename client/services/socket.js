const io = require('socket.io-client');
const chalk = require('chalk')
const {server_url} = require('../config/keys');

const socket = io(server_url);

socket.on('connect', () => {
    console.log(chalk.green('Connected to server!'));
    socket.emit('subscribe', 'pi-iot');
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
    socket.emit('data', {measurement: 123, pointName: 'hey-ho'});
}, 3 * 1000);

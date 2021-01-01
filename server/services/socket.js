const socket = require('socket.io');
const redisAdapter = require('socket.io-redis');
const chalk = require('chalk');

const {pub, sub} = require('../connections/redis_conn')
const {iWrite, closeWrite, iQuery} = require('../actions/influx_actions')

module.exports = (server) => {
    const io = socket(server)
    io.adapter(redisAdapter({host: 'redis', port: 6379}));

    io.on('connection', socket => {
        console.log(chalk.bgWhiteBright.black.bold(`Client with id: ${chalk.bgBlack.whiteBright(socket.id)} just connected!`));

        socket.on('disconnect', () => {
            console.log(chalk.red('Client disconnected!'));
        });

        socket.on('data', (data) => {
            const {measurement, pointName} = data;

            io.emit('console', {measurement})
            iWrite(pointName, socket.id, measurement)
        });

    });
}
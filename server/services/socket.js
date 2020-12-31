const socket = require('socket.io');
const chalk = require('chalk');

const {pub, sub} = require('../connections/redis_conn')
const {iWrite, closeWrite, iQuery} = require('../actions/influx_actions')

module.exports = (server) => {
    const io = socket(server)

    io.on('connection', socket => {
        console.log(chalk.bgWhiteBright.black.bold(`Client with id: ${chalk.bgBlack.whiteBright(socket.id)} just connected!`));

        socket.on('disconnect', () => {
            console.log(chalk.red('Client disconnected!'));
        });

        socket.on('data', (data) => {
            pub.publish('console', JSON.stringify(data));
        });

        sub.on('message', (channel, data) => {
            const {measurement, pointName} = JSON.parse(data);

            io.emit('console', {measurement})
            iWrite(pointName, socket.id, measurement)
        });

        sub.subscribe('console')
    });
}
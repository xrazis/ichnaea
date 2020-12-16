const socket = require('socket.io');
const chalk = require('chalk');

const {pub, sub} = require('../connections/redis_conn')
const {write, closeWrite, query} = require('../actions/influx_actions')

module.exports = (server) => {
    // noinspection JSValidateTypes
    const io = socket(server)

    io.on('connection', socket => {
        console.log(chalk.bgWhiteBright.black.bold(`Client with id: ${chalk.bgBlack.whiteBright(socket.id)} just connected!`));

        socket.on('disconnect', () => {
            console.log(chalk.red('Client disconnected!'));
        });

        socket.on('data', (data) => {
            const {measurement, pointName} = data;

            pub.publish('data', measurement);
            write(socket.id, measurement, pointName)
        })
    });
}
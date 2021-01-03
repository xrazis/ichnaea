const socket = require('socket.io');
const redisAdapter = require('socket.io-redis');
const mongoose = require('mongoose');
const chalk = require('chalk');

const {saveAthlete} = require('../actions/mongo_actions')
const {iWrite} = require('../actions/influx_actions')
const Athlete = mongoose.model('Athlete');

module.exports = (server) => {
    const io = socket(server)
    io.adapter(redisAdapter({host: 'redis', port: 6379}));

    io.on('connection', socket => {
        console.log(chalk.bgWhiteBright.black.bold(`Client with id: ${chalk.bgBlack.whiteBright(socket.id)} just connected!`));

        socket.on('disconnect', () => {
            console.log(chalk.red('Client disconnected!'));
        });

        socket.on('subscribe', async (room) => {
            const {subscribe, mac} = JSON.parse(room)

            socket.join(room);
            console.log(chalk.magenta(`Client with id: ${socket.id} joined room "${subscribe}"`));

            if (subscribe === 'clients') {
                const socketID = socket.id.toString();

                if (await Athlete.findOne({id: mac})) {
                    await Athlete.findOneAndUpdate({id: mac}, {socketID})
                    return;
                }

                await saveAthlete(mac, socketID)
            }
        });

        socket.on('data', (data) => {
            const {measurement, pointName, mac} = data;

            io.emit('console', {measurement})
            iWrite(pointName, mac, measurement)
        });

    });
}
const socket = require('socket.io');
const redisAdapter = require('socket.io-redis');
const mongoose = require('mongoose');

const {saveAthlete} = require('../actions/mongo_actions');
const {iWrite} = require('../actions/influx_actions');
const Athlete = mongoose.model('Athlete');
const User = mongoose.model('User');

module.exports = (server) => {
    const io = socket(server);
    io.adapter(redisAdapter({host: 'redis', port: 6379}));

    io.on('connection', socket => {
        let client;

        console.log(`Client with id: ${socket.id} just connected  with ${socket.conn.transport.name}!`);

        socket.on('disconnect', () => console.log('Client disconnected!'));

        socket.conn.on('upgrade', () => console.log(`Client with id: ${socket.id} upgraded to ${socket.conn.transport.name}!`));

        socket.on('subscribe', async room => {
            const {subscribe, id} = JSON.parse(room);
            const socketID = socket.id.toString();

            socket.join(room);
            console.log(`Client with id: ${socket.id} joined room "${subscribe}"`);

            try {
                if (subscribe === 'clients') {
                    client = await Athlete.findOne({id}).populate('_trainer');

                    if (client) {
                        await Athlete.findOneAndUpdate({id}, {socketID});
                        return;
                    }

                    await saveAthlete(id, socketID);

                } else if (subscribe === 'dashboard') {
                    client = await User.findOne({id});
                    await User.findOneAndUpdate({id}, {socketID});
                }
            } catch (e) {
                console.log(`Client not found in database! => ${e}`);
            }
        });

        socket.on('data', async data => {
            const {measurement, pointName, id} = data;

            if (client?._trainer) {
                // TODO Ack is not supported in broadcast mode, so we check for the right socketID everytime.
                client.trainer = await User.findOne({_id: client._trainer});
                io.volatile.to(client.trainer.socketID).emit('console', {measurement, pointName});
                iWrite(pointName, id, measurement);
            }
        });
    });
}
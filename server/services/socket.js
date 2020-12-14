const socket = require('socket.io');
const chalk = require('chalk')

module.exports = (server) => {
    // noinspection JSValidateTypes
    const io = socket(server)

    io.on('connection', socket => {
        console.log(chalk.bgWhiteBright.black.bold(`Client with id: ${chalk.bgBlack.whiteBright(socket.id)} just connected!`));
    });
}
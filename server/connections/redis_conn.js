const redis = require('redis');
const chalk = require('chalk');

const {redis_user, redis_password, redis_host, redis_port} = require('../config/keys')

const client = redis.createClient(`redis://${redis_host}:${redis_port}`);

client.on('error', function (error) {
    console.error(error);
});

console.log(chalk.greenBright.bold('Connected to redis!'))

module.exports = {client}
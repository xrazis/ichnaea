const redis = require('redis');
const chalk = require('chalk');

const {redis_host, redis_port} = require('../config/keys')

const pub = redis.createClient(`redis://${redis_host}:${redis_port}`);
const sub = pub.duplicate();

pub.on('error', (error) => {
    console.error(error);
});

pub.on('ready', () => {
    pub.flush;
    console.log(chalk.greenBright.bold('Connected to redis!'))
})

module.exports = {pub, sub}
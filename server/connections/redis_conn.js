const redis = require('redis');
const chalk = require('chalk');

const {redis_uri} = require('../config/keys')

const pub = redis.createClient(redis_uri);
const sub = pub.duplicate();

pub.on('error', (error) => {
    console.error(error);
});

pub.on('ready', () => {
    pub.flush;
    console.log(chalk.greenBright.bold('Connected to redis!'))
})

module.exports = {pub, sub}
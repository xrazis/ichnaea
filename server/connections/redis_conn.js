const redis = require('redis');

const {redis_uri} = require('../config/keys');

const pub = redis.createClient(redis_uri);
const sub = pub.duplicate();

pub.on('error', error => console.error(error));

pub.on('ready', () => console.log('Connected to redis!'));

module.exports = {pub, sub};
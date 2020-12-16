const redis = require('redis');

const subscriber = redis.createClient();
const publisher = redis.createClient();

let messageCount = 0;

subscriber.on('subscribe', function (channel, count) {
    publisher.publish('a channel', 'a message');
    publisher.publish('a channel', 'another message');
});

subscriber.on('message', function (channel, message) {
    messageCount += 1;

    console.log('Subscriber received message in channel \'' + channel + '\': ' + message);

    if (messageCount === 2) {
        subscriber.unsubscribe();
        subscriber.quit();
        publisher.quit();
    }
});

subscriber.subscribe('a channel');
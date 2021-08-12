const {createHash} = require('crypto');
const getMAC = require('getmac').default;
const mac = getMAC();
const id = createHash('md5').update(mac).digest('hex');

module.exports = {
    server_url: 'http://127.0.0.1:8000',
    id: id,
};
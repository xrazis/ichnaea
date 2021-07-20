const mongoose = require('mongoose');
const {mongo_uri} = require('../config/keys');

require('../models/User');
require('../models/Athlete');

mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('Connected to mongo!'));


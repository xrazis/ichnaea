const mongoose = require('mongoose');
const chalk = require('chalk')
const {mongo_uri} = require('../config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log(chalk.greenBright.bold('Connected to mongo!')));


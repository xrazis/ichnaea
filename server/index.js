const app = require('express')()
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const passport = require('./services/passport');
const chalk = require('chalk')
const cors = require('cors')
require('./services/socket')(server);

const dataRoute = require('./routes/data')
const authRoute = require('./routes/data')
const {session_secret} = require('./config/keys');

//allow for all requests for development.
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(
    require('cookie-session')({
        keys: [session_secret],
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
);

app.use(passport.initialize(undefined));
app.use(passport.session(undefined));

app.use(dataRoute)
app.use('/api', authRoute)

server.listen(6000, () => {
    console.log(chalk.green.bold('Server listening on port 6000!'));
});

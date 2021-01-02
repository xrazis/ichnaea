const app = require('express')()
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const chalk = require('chalk')
const cors = require('cors')
const history = require('connect-history-api-fallback');
const rateLimit = require('express-rate-limit');

require('./services/socket')(server);
require('./connections/mongo_conn');

const dataRoute = require('./routes/data')
const authRoute = require('./routes/auth')

const passport = require('./services/passport');
const {session_secret} = require('./config/keys');

app.use(cors(
    {
        origin: ['http://localhost:8080'],
        credentials: true
    }
));

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

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
app.use(authRoute)

app.use(history({
    verbose: true
}));

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(chalk.green.bold(`Server listening on port ${PORT}!`)));

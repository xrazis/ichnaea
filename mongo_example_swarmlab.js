'use strict'

var pathmodule = require('path');
var app = require('express')();
var http = require('http').Server(app);
var https = require('https');
var CONFIG = require(pathmodule.resolve(__dirname, 'runconfig.js'));
const io = require('socket.io')(http, {
//  pingTimeout: 30000,
//  allowUpgrades: false,
//  serveClient: false,
//  pingInterval: 10000,
//  //transports: [ 'websocket', 'polling' ],
//  transports: [ 'polling', 'websocket' ],
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true
    },
    cookie: {
        name: 'test',
        httpOnly: false,
        path: '/custom'
    }
});

/*
const Redis = require("ioredis");
const redistest = new Redis({
    host: 'redisserver',
    port: 6379,
  });
const pubtest = new Redis({
    host: 'redisserver',
    port: 6379,
  });
*/


//import { createAdapter } from 'socket.io-redis';
const createAdapter = require('socket.io-redis');
//const RedisClient = require("redis");
const Redis = require('ioredis');
//const pubClient = RedisClient.createClient({

const pubClient = new Redis({
    host: 'redisserver',
    port: 6379,
});

//const pubClient = new RedisClient({ host: 'localhost', port: 6379 });
const subClient = pubClient.duplicate();

io.adapter(createAdapter({pubClient, subClient}));


pubClient.on('connect', function () {
    console.log('You are now connected');
});

const MongoClient = require('mongodb').MongoClient;
const {DateTime} = require('luxon');


var async = require('async');
const {check, validationResult} = require('express-validator');
const urlExistSync = require('url-exist-sync');

var express = require('express');
app.use(express.json());

const axios = require('axios');
axios.defaults.timeout = 30000

const helmet = require('helmet');
app.use(helmet());

const cors = require('cors')
const whitelist = [
    'http://localhost:8080',
    'http://localhost:3080',
    'http://localhost:3081',
    'http://localhost:3082'
]
const corsOptions = {
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'device-remember-token',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Headers',
        'Origin',
        'Accept'
    ],
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(null, true)
            //callback(new Error('Not allowed by CORS'))
        }
    }
}


// ***************************************************
//      checktoken
// ***************************************************

async function checkToken(token) {
    const agent = new https.Agent({
        rejectUnauthorized: false,
    });
    const instance = axios.create({
        baseURL: 'https://api.swarmlab.io',
        withCredentials: true,
        rejectUnauthorized: false,
        crossdomain: true,
        httpsAgent: agent,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    })
    try {
        var pipelines = {
            'source': 'ssologin'
        }
        var params = {
            pipeline: pipelines
        }

        var options = {
            headers: {'content-type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${token}`},
        };

        instance.defaults.timeout = 30000;
        const res = await instance.post('/istokenvalidsso', params, options);
        if (res.status == 200) {
            //console.log("check " +JSON.stringify(res.data))
            return res.data
        } else {
            console.log('noerror: ' + res)
            return res.status

        }
    } catch (err) {
        console.error('error: ' + err);
        var error = new Object();
        error.action = '401'
        return error
    }
}


function convertDateToUTC(date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
}

// ***************************************************
//      get pipelines
// ***************************************************

async function getpipelines(token, pipelinename) {
    const agent = new https.Agent({
        rejectUnauthorized: false,
    });
    const instance = axios.create({
        baseURL: 'https://api.swarmlab.io',
        withCredentials: true,
        rejectUnauthorized: false,
        crossdomain: true,
        httpsAgent: agent,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    })
    /*
     var params = {
              playbook: value
            }
          var options = {
            params: params,
            headers: { 'content-type': 'application/x-www-form-urlencoded',Authorization: `Bearer ${token}` },
          };

          const playbook = await api.GET('playbookCode',options);
          return playbook
  */
    try {

        var pipelines = {
            'querytokenFilter': CONFIG.api.token,
            'filter': pipelinename
        }
        //var params = {
        //    pipeline: pipelines
        //  }
        var params = {
            querytokenFilter: CONFIG.api.token,
            filter: pipelinename
        }

        var options = {
            params: params,
            headers: {'content-type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${token}`},
        };

        //https://api.swarmlab.io/gettutorlabrooms?sort=pipelinename%7Casc&page=1&per_page=5&filter=&type=scripts&tutor=yes
        instance.defaults.timeout = 30000;
        //const res = await instance.get('/getplaygrounds',params,options);
        const res = await instance.get('/getplaygrounds', options);
        if (res.status == 200) {
            return res.data
        } else {
            console.log('noerror: ' + res)
            return await res.status

        }
    } catch (err) {
        console.error('error: ' + err);
        var error = new Object();
        error.action = '401'
        return await error
    }
}

// ***************************************************
//      get user pipelines
// ***************************************************

async function getuserpipelines(token, user, swarmlabname) {
    var pipelinename = user
    const agent = new https.Agent({
        rejectUnauthorized: false,
    });
    const instance = axios.create({
        baseURL: 'https://api.swarmlab.io',
        withCredentials: true,
        rejectUnauthorized: false,
        crossdomain: true,
        httpsAgent: agent,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    })
    try {

        var pipelines = {
            'querytokenFilter': CONFIG.api.token,
            'filter': pipelinename,
            swarmlabname: swarmlabname
        }
        //var params = {
        //    pipeline: pipelines
        //  }
        var params = {
            querytokenFilter: CONFIG.api.token,
            filter: pipelinename,
            swarmlabname: swarmlabname
        }

        var options = {
            params: params,
            headers: {'content-type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${token}`},
        };

        instance.defaults.timeout = 30000;
        const res = await instance.get('/getuserplaygrounds', options);
        if (res.status == 200) {
            return res.data
        } else {
            console.log('noerror: ' + res)
            return await res.status

        }
    } catch (err) {
        console.error('error: ' + err);
        var error = new Object();
        error.action = '401'
        error.error = err
        return await error
    }
}


global.online = 'ob';
global.pipelines = [];

function sendlog(reslog, pathfileval) {
    var usertmp = global.pipelines.find(x => x.pathlogfile == pathfileval);
    //for (var key in usertmp.data){
    var user = usertmp.data[0].user25user;
    // if(usertmp.data){
    console.log('-----------------------' + JSON.stringify(usertmp));
    io.in(user).emit('logdata', reslog);
    // }
    //}
}

function onlogfile(path) {

    console.log('File', path, 'has been added');
    var pathfileval = pathmodule.basename(path);
    var arrfile = pathfileval.toString().split('-');
    var pathfile = arrfile[0];
    var indexfind1 = global.pipelines.findIndex(x => x.pathlogfile == pathfileval);
    console.log('file11111111111111111111111111111111 ' + JSON.stringify(pathfileval))
    if (indexfind1 === -1) {
        (async () => {
            console.log('file2222222222222222222222222222222222222 ' + JSON.stringify(pathfileval))
            var token = 'd2539e5a7ae1f9f1b0eb2b8f22ca467a86d28407';  // desto
            var resdata = await getpipelines(token, pathfile)
            //resdata.data.pathlogfile = 'test'
            var resob = {}
            resob.pathlogfile = pathfileval
            var resobarray = []
            for (let i in resdata.data) {
                var resob1 = {}
                resob1.data = resdata.data[i].res25swarmlabname
                resob1.user25user = resdata.data[i].res25user
                resob1.res25creator = resdata.data[i].res25creator
                resob1.res25fileforce = resdata.data[i].res25fileforce
                resobarray.push(resob1)
            }
            resob.data = resobarray
            var indexfind = global.pipelines.findIndex(x => x.pathlogfile == pathfileval);
            indexfind === -1 ? global.pipelines.push(resob) : console.log('object already exists ' + pathfileval)
        })()
    }

}

// ***************************************************
//      rest  get
// ***************************************************

app.get('/get_log', [
        check('token').isLength({min: 40})
    ],
    cors(corsOptions), (req, res, next) => {

        (async () => {
            var RES = new Object();
            RES.token = req.query['token']
            RES.start = req.query['start']
            RES.end = req.query['end']
            RES.swarmlabname = req.query['swarmlabname']
            RES.ok = 'ok'
            /*
             *
             * validate
             *
             */


            var isvalid = await checkToken(RES.token);
            if (isvalid.action == 'ok') {
                console.log('Authserver ok ' + RES.token);
                RES.error = 'ok'
            } else {
                console.log('Authserver no ' + RES.token);
                RES.error = 'no'
            }
            if (RES.error == 'ok') {

                var resdata = await getuserpipelines(RES.token, isvalid.user, RES.swarmlabname)
                var mongourl = 'mongodb://' + CONFIG.mongo.user + ':' + CONFIG.mongo.password + '@ondemand_playground_mongo1:27017,ondemand_playground_mongo2:27017,ondemand_playground_mongo3:27017,ondemand_playground_mongo4:27017,ondemand_playground_mongo5:27017,ondemand_playground_mongo6:27017,ondemand_playground_mongo7:27017/fluent?replicaSet=rs1&authSource=swarmlabplaygroundstats'
                const OPTS = {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                };
                MongoClient.connect(mongourl, OPTS, function (err, client) {
                    if (err) {
                        console.log(err);
                    } else {
                        const db = client.db('fluent');
                        //usersession.SOCKET.user  = isvalid.user
                        console.log(JSON.stringify('mongo ----------------connected'))
                        console.log('-----test------- ' + JSON.stringify(RES))
                        if ((typeof RES.start !== 'undefined') && (typeof RES.end !== 'undefined')) {
                            if (DateTime.fromISO(RES.start).isValid) {
                                var datestart = DateTime.fromISO(RES.start)
                                var dateend = DateTime.fromISO(RES.end)
                                var search_term = {
                                    '$and': [
                                        {
                                            'time': {
                                                $gte: datestart
                                            }
                                        },
                                        {
                                            'time': {
                                                $lt: dateend
                                            }
                                        },
                                    ]
                                }
                            } else {
                                RES.ok = 'no'
                            }
                        } else if (typeof RES.end !== 'undefined') {
                            var dateend = DateTime.fromISO(RES.end)
                            if (DateTime.fromISO(RES.end).isValid) {
                                var search_term = {
                                    '$and': [
                                        {
                                            'time': {
                                                $lt: dateend
                                            }
                                        }
                                    ]
                                }
                            } else {
                                RES.ok = 'no'
                            }
                        } else if (typeof RES.start !== 'undefined') {
                            var datestart = DateTime.fromISO(RES.start)
                            if (DateTime.fromISO(RES.start).isValid) {
                                var search_term = {
                                    '$and': [
                                        {
                                            'time': {
                                                $gte: datestart
                                            }
                                        }
                                    ]
                                }
                            } else {
                                RES.ok = 'no'
                            }
                        }
                        if (RES.ok == 'ok') {
                            //var search_term =  '{"$gte": new Date("2020-12-01T00:00:00.000Z") , "$lt": new Date("2020-12-11T16:17:36.470Z") }'
                            //var search_term = {"time" : {$lte : datenow}}
                            var resdataarray = []
                            var resraw = {}
                            var reslab = ''
                            var datestart1 = DateTime.fromISO(RES.start)
                            console.log('-----now1------- ' + JSON.stringify(search_term))
                            console.log('-----now2------- ' + JSON.stringify(datestart1))
                            console.log('-----now3------- ' + JSON.stringify(datestart))

                            db.collection('logs').find(search_term).toArray()
                                //db.collection('logs').find({"time" : {$gt : datestart}}).toArray()
                                .then(item => {
                                    console.log('item ' + JSON.stringify(item))
                                    for (let i in item) {
                                        reslab = item[i].tailed_path
                                        var segment_array = reslab.split('/');
                                        var last_segment = segment_array.pop();
                                        var fieldstmp = last_segment.split('-');
                                        var nameofswarmlab = fieldstmp[0];

                                        var regexlog = new RegExp(nameofswarmlab);
                                        for (let ii in resdata.data) {
                                            if (regexlog.test(resdata.data[ii].res25swarmlabname)) {
                                                resdataarray.push(item[i])
                                                RES.found = item[i]
                                            }
                                        }
                                    }

                                    RES.error_msg = 'ok'
                                    RES.data = resdataarray
                                    //RES.dataserver = resdataarray
                                    //RES.dataservertmp = resdata
                                    res.json(RES)
                                })
                                .catch(err => {
                                    console.error(err)
                                    RES.error_msg = err
                                    res.json(RES)
                                })
                        } else { // RES.ok
                            RES.error_msg = 'no date'
                            res.json(RES)
                        }
                    }  // error mongo connect
                });  // mongo connect
            } else { // token error
                RES.data = 'no'
                RES.error_msg = 'token err'
                res.json(RES)
            }
        })()

    });

app.get('/run', [
        //check('access_token').isLength({ min: 40 }),
        //check('llo').isBase64()
    ],
    cors(corsOptions), (req, res, next) => {

        (async () => {

            var mongourl = 'mongodb://' + CONFIG.mongo.user + ':' + CONFIG.mongo.password + '@ondemand_playground_mongo1:27017,ondemand_playground_mongo2:27017,ondemand_playground_mongo3:27017,ondemand_playground_mongo4:27017,ondemand_playground_mongo5:27017,ondemand_playground_mongo6:27017,ondemand_playground_mongo7:27017/fluent?replicaSet=rs1&authSource=swarmlabplaygroundstats'
            const OPTS = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            };
            MongoClient.connect(mongourl, OPTS, function (err, client) {
                if (err) {
                    console.log(err);
                } else {
                    const db = client.db('fluent');
                    //db.collection('log', onCollection);
                    console.log(JSON.stringify('mongo connected'))
                    var stream = db.collection('logs').find({}, {
                        tailable: true,
                        awaitdata: true
                        /* other options */
                    }).stream();

                    stream.on('data', function (doc) {
                        console.log(JSON.stringify(doc))
                        //socket.iWrite(JSON.stringify({'action': 'log','param': doc.log}));
                    });
                }
            });
            var RES = new Object();
            RES.code = req.query['filter']
            RES.token = req.query['filter']
            var isvalid = await checkToken(RES.token);
            if (isvalid.action == 'ok') {
                console.log('Authserver ok ' + RES.token);
            } else {
                console.log('Authserver no ' + RES.token);
            }
            RES.error = false
            RES.error_msg = 'ok'
            res.json(RES)
        })()

    });

// ***************************************************
//      rest  post
// ***************************************************

app.post('/run', [
        //check('access_token').isLength({ min: 40 }),
        //check('llo').isBase64()
    ],
    cors(corsOptions), (req, res, next) => {


        (async () => {

            //console.log(JSON.stringify(req.headers));
            //console.log(JSON.stringify(req.body));
            //console.log("mongo "+JSON.stringify(req.body));
            //console.log("LOG "+JSON.stringify(req.body[0].message));
            //console.log("PATH "+JSON.stringify(req.body[0].tailed_path));
            for (var i = 0; i < req.body.length; i++) {
                //var getpath = await onlogfile(req.body[i].tailed_path)

                var path = req.body[i].tailed_path

                console.log('File', path, 'has been added');
                var pathfileval = pathmodule.basename(path);
                var arrfile = pathfileval.toString().split('-');
                var pathfile = arrfile[0];
                var indexfind1 = global.pipelines.findIndex(x => x.pathlogfile == pathfileval);
                console.log('file11111111111111111111111111111111 ' + JSON.stringify(pathfileval))
                if (indexfind1 === -1) {
                    (async () => {
                        console.log('file2222222222222222222222222222222222222 ' + JSON.stringify(pathfileval))
                        var token = 'd2539e5a7ae1f9f1b0eb2b8f22ca467a86d28407';  // desto
                        var resdata = await getpipelines(token, pathfile)
                        //resdata.data.pathlogfile = 'test'
                        var resob = {}
                        resob.pathlogfile = pathfileval
                        var resobarray = []
                        for (let i in resdata.data) {
                            var resob1 = {}
                            resob1.data = resdata.data[i].res25swarmlabname
                            resob1.user25user = resdata.data[i].res25user
                            resob1.res25creator = resdata.data[i].res25creator
                            resob1.res25fileforce = resdata.data[i].res25fileforce
                            resobarray.push(resob1)
                        }
                        resob.data = resobarray
                        //var indexfind = global.pipelines.findIndex(x => x.res25swarmlabname==resdata.data[0].res25swarmlabname);
                        var indexfind = global.pipelines.findIndex(x => x.pathlogfile == pathfileval);

                        //indexfind === -1 ? global.pipelines.push({resob}) : console.log("object already exists")
                        indexfind === -1 ? global.pipelines.push(resob) : console.log('object already exists ' + pathfileval)

                        //console.log('info', JSON.stringify(resdata));
                        //console.log('info------------- ', JSON.stringify(global.pipelines));
                    })()
                }
                //
                var obj = req.body[i];

                //var indexfind = global.pipelines.findIndex(x => x.res25swarmlabname==resdata.data.res25swarmlabname);
                //indexfind === -1 ? global.pipelines.push(resob) : console.log("object already exists")
                var now = new Date();

                var reslog = new Object();
                reslog.log = obj

                reslog.date = convertDateToUTC(now)
                console.log(reslog);
                var pathfileval = pathmodule.basename(reslog.log.tailed_path);
                var indexfind = global.pipelines.findIndex(x => x.pathlogfile == pathfileval);
                //indexfind === -1 ? sendlog(reslog,pathfileval) : console.log("object already exists")
                indexfind === -1 ? console.log('object not found') : sendlog(reslog, pathfileval)
                console.log('IOT ' + JSON.stringify(reslog.log.tailed_path));
                console.log('IOTindexfind ' + JSON.stringify(indexfind));
                console.log('IOTuser ' + JSON.stringify(global.pipelines));
                // io.in("iot").emit("message", reslog);
                // io.emit("logdata", reslog);
            }
        })()

        //io.in("iot").emit("message", RES);

        console.error('socket POST from client');
        var RES = new Object();
        RES.error = false
        RES.error_msg = 'ok'
        RES.msg = req.body[0].messsage

        res.json(RES)
    });

// ***************************************************
//      socket
// ***************************************************

//function getSHA256ofJSON(input){
//  return   require("crypto").createHash("sha256").update(JSON.stringify(input)).digest("hex");
//}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getSHA256ofJSON(data, inputEncoding, encoding) {
    if (!data) {
        return '';
    }
    inputEncoding = inputEncoding || 'utf-8';
    encoding = encoding || 'hex';
    const hash = require('crypto').createHash('md5');
    return hash.update(JSON.stringify(data), inputEncoding).digest(encoding);
}

//var getkey = function getkey(key) {
async function getkey(key) {
    return new Promise((resolve) => {


        pubClient.get(key, function (err, reply) {
            if (err) {

                console.log('----------error------------')

                resolve(null)
            } else {
                if (reply) {
                    console.log('---------fount----------')
                    resolve(1)
                } else {
                    console.log('----------not fount------------')
                    resolve(2)
                    //return 2
                }
            }
        })
    })
}

var setkey = function setkv(key, value) {
    return new Promise((resolve) => {
        //pubClient.set(key,value, 'EX', expire, function(err,reply){
        pubClient.set(key, value, function (err, reply) {
            if (err) {
                resolve(null)
            } else {
                resolve(reply)
            }
        })
    })
}

async function iosend(data, issend, io, pubClient, user1) {
    var new1 = {}
    new1.tailed_path = data.tailed_path
    new1.message = data.message

    var now = new Date();
    var reslog1 = {}
    //reslog1.data = resob1
    reslog1.log = new1
    reslog1.date = convertDateToUTC(now)
    var user = user1

    const randomTimeInMs = Math.random() * (2000);
    await sleep(randomTimeInMs);
    var getres = await getkey(issend);

    if (getres == '1') {
        console.log(issend + ' ---1 ' + JSON.stringify(reslog1))
        //io.in(user).emit("logdata", reslog1);
    } else if (getres == '2') {
        console.log(issend + ' ---2 ' + JSON.stringify(reslog1))
        setkey(issend, '1')
        //pubClient.set(issend, '1', function(err, res) {
        //});
        io.in(user).emit('logdata', reslog1);
        //}

    }

}

function onCollection(err, collection) {
    let options = {
        tailable: true,
        awaitdata: true,
        numberOfRetries: -1,
        tailableRetryInterval: 500
    };
    var cursor = collection.find({}, options).stream();
    var itemsProcessed = 0;

    var reslog = new Object();
    var now = new Date();
    cursor.on('data', function (data) {
        var issendob = new Object();
        issendob.id = data._id
        issendob.message = data.message
        issendob.tailed_path = data.tailed_path

        var issend = getSHA256ofJSON(issendob)

        console.log('++++++++' + JSON.stringify(data));
        console.log('++++++++ob' + JSON.stringify(issendob));
        console.log('++++++++sha' + JSON.stringify(issend));

        var pathfileval = pathmodule.basename(data.tailed_path);
        var arrfile = pathfileval.toString().split('-');
        var pathfile = arrfile[0];

        var indexupdate = 'yes'
        var resob = {};
        pubClient.get(pathfileval, function (err, object) {
            var objecttmp = JSON.parse(object);
            if (object) {
                var user1 = objecttmp.user25user.replace(/[\n\t\r]/g, '')
                iosend(data, issend, io, pubClient, user1)
            } else {
                (async () => {
                    var token = 'd2539e5a7ae1f9f1b0eb2b8f22ca467a86d28407';  // desto
                    var resdata1 = await getpipelines(token, pathfile)
                    resob.pathlogfile = pathfileval
                    var resob11 = {}
                    var i1 = 0
                    resob11.data = resdata1.data[i1].res25swarmlabname
                    resob11.user25user = resdata1.data[i1].res25user.replace(/[\n\t\r]/g, '')
                    resob11.res25creator = resdata1.data[i1].res25creator
                    resob11.res25fileforce = resdata1.data[i1].res25fileforce
                    resob11.tailed_path = pathfileval
                    var resob1string1 = JSON.stringify(resob11);
                    await pubClient.set(pathfileval, resob1string1, function (err, res) {
                    });
                    var user1 = resob11.user25user
                    iosend(data, issend, io, pubClient, user1)
                    console.log(' ---no--- ' + JSON.stringify(data))
                })() //await inside yes
            }
        });

    });


    setInterval(function () {
        console.log('itemsProcessed', itemsProcessed);
        // this method is also exposed by the Server instance
        //console.log(adapter.rooms);
    }, 8000);
}


var mongourl = 'mongodb://' + CONFIG.mongo.user + ':' + CONFIG.mongo.password + '@ondemand_playground_mongo1:27017,ondemand_playground_mongo2:27017,ondemand_playground_mongo3:27017,ondemand_playground_mongo4:27017,ondemand_playground_mongo5:27017,ondemand_playground_mongo6:27017,ondemand_playground_mongo7:27017/fluent?replicaSet=rs1&authSource=swarmlabplaygroundstats'
const OPTS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
var mongooptions = {
    autoReconnect: true,
    keepAlive: 1,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 0
}
MongoClient.connect(mongourl, OPTS, function (err, client) {
    if (err) {
        console.log(err);
    } else {
        const db = client.db('fluent');
        db.collection('logs', onCollection);
    }
});

io.on('connection', s => {
    console.error('socket connection');

//s.set('transports', ['websocket']);
//s.set('pingTimeout', 30000);
//s.set('allowUpgrades', false);
//s.set('serveClient', false);
//s.set('pingInterval', 10000);
    // ------------------------------
    // --- set
    // ------------------------------
    var usersession = new Object();
    usersession.SOCKET = {};
    usersession.SOCKET.error = {};
    console.error('socket ...');
    s.auth = false;

    // ------------------------------
    // --- authenticate
    // ------------------------------
    s.on('authenticate', function (data) {
        const token = data
        console.log('invalid 1 ' + token);
        (async () => {
            var isvalid = await checkToken(token);
            if (isvalid.action == 'ok') {
                console.log('Authserver ok ', s.id + ' - ' + token);
                // pubClient.set(session, resob1string, function(err, res) {
                // });
                usersession.SOCKET.user = isvalid.user
                usersession.SOCKET.scope = isvalid.scope // space delimeter
                usersession.SOCKET.token = isvalid.token
                s.auth = true;
            } else {
                console.log('Authserver no ', s.id + ' - ' + token);
                s.auth = false;
            }
        })()
    });

    setTimeout(function () {
        if (!s.auth) {
            console.log('Disconnecting timeout socket ', s.id);
            //s.disconnect('unauthorized');
        } else {
            var room = usersession.SOCKET.user
            //s.on("subscribe", function (room) {
            s.join(room);
            console.log('joining rooom', s.rooms);
            console.log(room + ' created ')
            // });
        }
    }, 30000);


    var id = s.id
    s.on('log', obj => {
        console.error('from client ' + s.id + ' obj ' + obj);
    });

});

http.listen(3000, () => console.error('listening on http://localhost:3000/'));
console.error('socket.io example');
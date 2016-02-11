'use strict';

var express = require('express');
var cors = require('cors');
var PORT = process.env.PORT || 9000;
var SOCKET_PORT = process.env.SOCKET_PORT || 9001;
var ENV = process.env.ENV || 'dev';

var app = express();

app.get('/init.js', function(req, res) {
  //intercept route and serve init.dev.js file if browser calls main.js
  let filePath = (ENV === 'dev') ? __dirname + '/src/init.dev.js' : __dirname + '/src/init.js';
  res.sendFile(filePath, function(err) {
    if (err) {
      console.error(err);
      return res.status(err.status).end();
    }
    console.log('Intercepted request for init.js file. Serving init.dev.js file instead.');
  });
});

if (ENV === 'dev') {
  let jwt = require('jsonwebtoken');
  let bodyParser = require('body-parser');
  let secret = 'foobar';

  app.use(bodyParser());

  let auth = function (req, res, next) {
    if (!req.headers.authorization) {
      res.sendStatus(401);
    }
    let token = req.headers.authorization;

    try {
      let decoded = jwt.verify(token.replace('Bearer ', ''), secret);
      next();
    } catch(e) {
      res.status(401).json({message: 'invalid token'});
    }
  };

  app.get('/orders', auth, function(req, res) {
    const returnArr = [];
    for (let i = 0; i < 200; i++) {
      returnArr.push({
        id: i,
        shop: 'Test Shop ',
        pickup: 'pickup location ' + i,
        delivery: 'delivery location ' + i,
      });
    }

    res.status(200).json(returnArr);
  });


  app.post('/auth/login', function(req, res) {
    if (req.body.username === 'username' && req.body.password === 'password') {
      let token = jwt.sign({id: 12345, username: 'username', roles: ['DISPATCHER']}, secret);
      console.log(token)
      res.status(200).json({token: token});
    } else {
      res.sendStatus(403);
    }
  });
}

//set 'src' directory to where static assets get served from
app.use(express.static('src', {
  maxAge: -1,
}));

app.use('/*', function(req, res) {
  res.sendFile(__dirname + '/src/index.html', function (err) {
    if (err) {
      console.error(err);
      return res.status(err.status).end();
    }
  });
});

//enable cors
app.use(cors());

//socket emitter emits file system changes to the client
require('chokidar-socket-emitter')({port: SOCKET_PORT});

app.listen(PORT, function() {
  console.log('Server listening on port ' + PORT + ' in ' + ENV + ' mode.');
});

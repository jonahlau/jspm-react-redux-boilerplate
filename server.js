'use strict';

var express = require('express');
var cors = require('cors');
var PORT = process.env.PORT || 9000;
var SOCKET_PORT = process.env.SOCKET_PORT || 9001;
var ENV = process.env.ENV || 'dev';

var app = express();

app.get('/init.js', function(req, res) {
  //intercept route and serve init.dev.js file if browser calls main.js
  var filePath = (ENV === 'dev') ? __dirname + '/src/init.dev.js' : __dirname + '/src/init.js';
  res.sendFile(filePath, function(err) {
    if (err) {
      console.error(err);
      return res.status(err.status).end();
    }
    console.log('Intercepted request for init.js file. Serving init.dev.js file instead.');
  })
});

if (ENV === 'dev') {
  var jwt = require('jwt-simple');
  var bodyParser = require('body-parser');
  var secret = 'foobar';

  app.use(bodyParser())

  var auth = function (req, res, next) {
    if (req.headers.authorization) {
      var user = jwt.decode(req.headers.authorization.token);
      req.user = user;
    }
    next();
  };

  app.get('/orders', auth, function(req, res) {
    var returnArr = [];
    for (var i=0; i<200; i++) {
      returnArr.push({
        id: i,
        shop: 'Test Shop ',
        pickup: 'pickup location ' + i,
        delivery: 'delivery location ' + i
      })
    }

    res.status(200).json(returnArr);
  });


  app.post('/auth/login', function(req, res) {
    if (req.body.username &&
      req.body.username === 'username' &&
      req.body.password &&
      req.body.password === 'password') {
      res.status(200).json({ token : jwt.encode({ id: 'superawesomeuserid', roles: ['dispatcher'] }, secret)})
    }
  });
}

//set 'src' directory to where static assets get served from
app.use(express.static('src', {
  maxAge: -1
}));

//enable cors
app.use(cors());

//socket emitter emits file system changes to the client
require('chokidar-socket-emitter')({port: SOCKET_PORT});

app.listen(PORT, function() {
  console.log('Server listening on port ' + PORT + ' in ' + ENV + ' mode.');
});

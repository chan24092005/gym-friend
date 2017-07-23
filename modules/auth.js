var express = require('express');
var app = express();
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User   = require('../models/user'); // get our mongoose model
var config = require('../config.js'); // get our config file




// API ROUTES -------------------

// get an instance of the router for api routes
var apiRoutes = express.Router();

// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/login', function(req, res) {
  console.log(req.body.username);
  console.log(req.body.password);
  // find the user
  User.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign({
          username: user.username
        }, config.secret, {
          expiresIn: '24h' // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: {token}
        });
      }

    }

  });
});

// TODO: route middleware to verify a token
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log('req.header')
  console.log(req.path)
  // decode token

  var exceptionEndPoints = [
    {path: '/authenticate', method: 'POST'},
    {path: '/users', method: 'POST'}
  ];

  function isExceRes(req) {
    return exceptionEndPoints.some(function(ep) {
      console.log(ep);
      console.log(req.path);
      console.log(req.method);
      return req.path === ep.path && req.method === ep.method;
    });
  }

  if (isExceRes(req)) {
    next();
  } else if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      console.log('err')
      console.log(err)
      console.log(decoded)
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;


        User.findOne({
          username: req.decoded.username
        }, function(err, user) {

          if (err) throw err;

          if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
          } else if (user) {
            req.user=user;
            next();
          }

        });



      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});

// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
  console.log('user11111111111111:');
  console.log(req.user);
  if (req.user.admin) {
    User.find({}, function(err, users) {
      res.json(users);
    });
  } else {
    res.json({'error': 'no permission'});
  }
});

// get own account information
apiRoutes.get('/users/self', function(req, res) {
  console.log('user11111111111111:');
  console.log(req.user);
  res.json(req.user);
});
// update own account information
apiRoutes.post('/users/self', function(req, res) {
  console.log('user11111111111111:');
  console.log(req.user);
  if (req.user.tall) {
    req.user.tall = req.body.tall;
  }
  if (req.user.weight) {
    req.user.weight = req.body.weight;
  }
  if (req.user.sport) {
    req.user.sport = req.body.sport;
  }


  res.json(req.user);
});

// Create a new user
apiRoutes.post('/users', function(req, res) {
  // username and password are mandatory; others are optional; sports has to follow the format of sport schema
  if (!req.body.username || !req.body.password) {
    res.json({error: 'wrong/missing input'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name?req.body.name:'',
      tall: req.body.tall?req.body.tall:null,
      weight: req.body.weight?req.body.weight:null,
      admin: false,
      sports: req.body.sports?req.body.sports:[]
    });

    // save the sample user
    newUser.save(function(err) {
      if (err) throw err;

      console.log('User saved successfully');
      res.json({ success: true });
    });
  }
});



module.exports = apiRoutes;

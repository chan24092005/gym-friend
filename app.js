var express = require('express')
var app = express()
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var config = require('./config'); // get our config file

var authRoutes = require('./modules/auth.js');
var User = require('./models/user');
// =======================
// configuration =========
// =======================
var port = 3000;
mongoose.connect(config.database);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// basic route
app.get('/', function(req, res) {
  res.json({message: 'Hello World!'});
})


app.get('/createAdmin', function(req, res) {

  // create a sample user
  var nick = new User({
    username: 'admin',
    password: 'password',
    admin: true
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

// apply the routes to our application with the prefix /api
app.use('/api', authRoutes);



// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);

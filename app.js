'use strict'
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session');
var passport = require('passport');
var morgan = require('morgan');
var MongoStore = require('connect-mongo')(session);
var mongoConnectionString = require('./configs/config.js').mongoConnectionString;
var userController = require('./controllers/user');
// Connect to the beerlocker MongoDB
mongoose.connect(mongoConnectionString);

var app = express();

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.use(session({
    secret: 'anhtu',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: mongoConnectionString,
        ttl: 3 * 60
    })
}));
// config passport

app.use(passport.initialize());
app.use(passport.session());
require('./passport/local-passport.js')(passport);

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /users
router.route('/users')
    .get(userController.getUsers)

router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login' 
}));

app.use('/api', router);

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/signup', function(req, res) {
    res.render('signup');
});

app.get('/login', function(req, res) {
    res.render('login');
});

//parammeter id course
app.get('/course', function(req, res) {
    res.render('course');
});

//parammeter id lesson
app.get('/lesson', function(req, res) {
    res.render('lesson');
});

app.get('/home', function(req, res) {
    if(req.isAuthenticated()){
        res.render('home');
    }else{
        res.redirect('/');
    }        
});
// Start server
app.listen(app.get('port'), function() {
    console.log("server started on http://localhost:" + app.get('port') + ";\n please press Ctrl+C to terminate");
});
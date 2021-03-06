'use strict'
var fs = require('fs');
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
var courseController = require('./controllers/course');
var lessonController = require('./controllers/lesson');
var enrollController = require('./controllers/enroll');

var filterip = require('./filterIP/filterip.js');

var middleware = require('./middlewares/middleware.js');


//https
var https = require('https');
var options = {
  key: fs.readFileSync(__dirname + '/ssl_certificate/server.key'),
  cert: fs.readFileSync(__dirname + '/ssl_certificate/server.crt')
};


// Connect to the beerlocker MongoDB
mongoose.connect(mongoConnectionString);

var app = express();

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8000);

var accessLogStream = fs.createWriteStream(__dirname+'/logs/access.log', {flags: 'a'});

app.use(morgan('dev'));
app.use(morgan('combined', {stream: accessLogStream}));

// filter ip
app.use(filterip);

// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.use(session({
    secret: 'anhtu',
    cookie: { maxAge: 600000 },
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: mongoConnectionString,
        ttl: 60 * 10
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
    .get([middleware.isAuthenticated, middleware.isAdmin], userController.getUsers)
    .post(userController.postUsers);

router.route('/courses')
    .get(courseController.getCourses)
    .post(courseController.postCourses);

router.get('/courses/:id', courseController.getCourseById);

//
router.get('/enroll/user/:courseId', middleware.isAuthenticated ,enrollController.isEnrolledCourse);
router.get('/enroll/:id', middleware.isAuthenticated, enrollController.getEnrolledCourseByUserId);
router.post('/enroll', middleware.isAuthenticated, enrollController.postEnrollCourse);

router.route('/lessons')
    .get([middleware.isAuthenticated, middleware.isAdmin], lessonController.getLessons)
    .post([middleware.isAuthenticated, middleware.isAdmin], lessonController.postLessons);

router.get('/lessons/:id', lessonController.getLessonById);
router.get('/lessons/course/:courseId', lessonController.getLessonsByCourseId);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login'
}));

app.use('/api', router);


app.get('/', function(req, res) {
    var user = null;
    res.render('home', {user: user});
});

app.get('/signup', function(req, res) {
    res.render('signup');
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
//parammeter id course
app.get('/courses/:courseId', function(req, res) {
    var user = null;
    var course = { _id: req.params.courseId};
    if(req.user){
        user = {
            _id: req.user._id,
            role: req.user.role,
            name: req.user.name
        }
    }
    res.render('course', {user: user, course: course});
});



//parammeter id lesson
app.get('/lessons/:id', function(req, res) {
    var user = null;
    var lessonId = req.params.id;
    if(req.user){
        user = {
            _id: req.user._id,
            role: req.user.role,
            name: req.user.name
        }
    }

    var lesson = {
        id: lessonId
    }
    res.render('lesson', {user: user, lesson: lesson});
});

app.get('/home', function(req, res) {
    if (req.isAuthenticated()) {
        var user = {
            _id: req.user._id,
            role: req.user.role,
            name: req.user.name
        }
        res.render('home', { user: user });
    } else {
        res.redirect('/');
    }
});
// Start server

app.get('/manage', middleware.isAdmin, function(req, res) {
    var user = null;
    if(req.user){
        user = {
            _id: req.user._id,
            role: req.user.role,
            name: req.user.name
        }
    }
    res.render('manage', {user: user});
});


https.createServer(options, app).listen(8000, function () {
   console.log('Started!');
});

// app.listen(app.get('port'), function() {
//     console.log("server started on http://localhost:" + app.get('port') + ";\n please press Ctrl+C to terminate");
// });
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
var courseController = require('./controllers/course');
var lessonController = require('./controllers/lesson');
var enrollController = require('./controllers/enroll');

// Connect to the beerlocker MongoDB
mongoose.connect(mongoConnectionString);

var app = express();

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8000);

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
    .get(userController.getUsers)
    .post(userController.postUsers);

router.route('/courses')
    .get(courseController.getCourses)
    .post(courseController.postCourses);

router.get('/courses/:id', courseController.getCourseById);

router.get('/enroll/:id',enrollController.getEnrollCourseByUserId);
router.post('/enroll', enrollController.postEnrollCourse);

router.route('/lessons')
    .get(lessonController.getLessons)
    .post(lessonController.postLessons);

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
            name: req.user.name
        }
    }
    res.render('course', {user: user, course: course});
});



//parammeter id lesson
app.get('/lesson', function(req, res) {
    var user = null;
    if(req.user){
        user = {
            _id: req.user._id,
            name: req.user.name
        }
    }
    res.render('lesson', {user: user});
});

app.get('/home', function(req, res) {
    if (req.isAuthenticated()) {
        var user = {
            _id: req.user._id,
            name: req.user.name
        }
        res.render('home', { user: user });
    } else {
        res.redirect('/');
    }
});
// Start server
app.listen(app.get('port'), function() {
    console.log("server started on http://localhost:" + app.get('port') + ";\n please press Ctrl+C to terminate");
});
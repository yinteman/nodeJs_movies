var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var path=require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session=require('express-session');
var mongoose=require('mongoose');

var routes = require('./routes/index');
var list=require('./routes/list');
var admin=require('./routes/admin');
var detail=require('./routes/detail');
var user=require('./routes/user');
var middle=require('./routes/middle');
var comment=require('./routes/comment');
var category=require('./routes/category');
var app = express();

//connect数据库
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/movie');
db = mongoose.connection;
db.once('open', function callback () {
  console.log('he');
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'movie',
  resave: false,
  saveUninitialized: true,
}));

app.use('/index',function(req,res,next){

  app.locals.user=req.session.user;
  console.log(user);
  next();
},routes);
app.use('/list',list);
app.use('/admin',admin);
app.use('/detail',detail);
app.use('/user',user);
app.use('/comment',comment);
app.use('/category',category);

var port=process.env.PORT||3000;
app.listen(port);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

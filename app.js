var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const apiRouter = require('./routes/api')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'public')));


// console.log(path.join(__dirname, 'build/index.html'))
// app.get('/api', (req, res, next) => {
//   console.log('in api route')
//   console.log('URL: ', req.url);
//   const url = req.url;
//   res.redirect(`http://localhost:8888${url}`);
// });
// app.use('/users', usersRouter);


// app.get('/api/*', (req, res) => {
//   console.log('URL*: ', req.url);
//   res.redirect(`http://localhost:8888${req.url}`)
// })
app.use('/api', apiRouter)
app.use('*', (req, res) => {
  console.log('===============file html has sent')
  console.log(path.resolve(__dirname, 'build/index.html'))
  res.sendFile(path.resolve(__dirname, 'build/index.html'))

});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

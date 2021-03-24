const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const api = require('./routes/api');

const companiesInfo = require('./routes/companiesInfo');
app.use('/companiesInfo', companiesInfo);

// todo  -------------------------------------   < database > --------------------------------

app.use('/', api);

const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/companies_hw17', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// todo  -------------------------------------   </ database > --------------------------------








// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({
//   extended: false
// }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
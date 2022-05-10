import 'dotenv/config';
import cookieParser from 'cookie-parser';
import express from 'express';
import httpErrors from 'http-errors';
import logger from 'morgan';
import path from 'path';
import mongoose from 'mongoose';
import compression from 'compression';
import helmet from 'helmet';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import __dirname from './dirname.js';

import indexRouter from './routes/index.js';
import signupRouter from './routes/register.js';
import loginRouter from './routes/login.js';

const app = express();

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({ secret: 'cat', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(
	helmet({
		contentSecurityPolicy: false,
	})
);
app.use(compression());

app.use('/', indexRouter);
app.use('/register', signupRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

export default app;

import session from 'express-session';
import LocalStrategy from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import app from '../app.js';
import User from '../models/user.js';

app.use(session({ secret: 'cat', resave: false, saveUninitialized: true }));

passport.use(
	new LocalStrategy((username, password, done) => {
		User.findOne({ username }, (error, user) => {
			if (error) return done(error);
			if (!user) {
				return done(null, false, {
					message: 'Incorrect username or password ',
				});
			}
			bcrypt.compare(password, user.password, (error, res) => {
				if (res) {
					return done(null, user);
				}
				return done(null, false, { message: 'Incorrect password' });
			});
		});
	})
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (error, user) => {
		done(error, user);
	});
});

app.use(passport.initialize());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

app.use(passport.session());

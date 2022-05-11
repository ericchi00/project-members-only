import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('login', { title: 'Login Form' });
});

router.post(
	'/',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
	})
);

export default router;

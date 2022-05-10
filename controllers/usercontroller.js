import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const registerPost = [
	body('username')
		.trim()
		.isLength({ min: 4 })
		.escape()
		.withMessage('Username must be at least 4 characters')
		.isAlphanumeric()
		.withMessage('Username has non-alphanumeric characters.'),
	body('password')
		.isLength({ min: 5 })
		.withMessage('Password must be at least 5 charaacters'),

	(req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.render('register', {
				title: 'Register',
				user: req.body,
				errors: errors.array(),
			});
		} else {
			const hashPass = bcrypt.hash(
				req.body.password,
				10,
				(error, hashedPassword) => {
					if (error) return next(error);
					return hashedPassword;
				}
			);
			const user = new User({
				username: req.body.username,
				password: hashPass(),
			});
			user.save((error) => {
				if (error) {
					return next(error);
				}
				res.redirect('/');
			});
		}
	},
];

export { registerPost };

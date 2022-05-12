import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const registerPost = [
	body('username')
		.trim()
		.isLength({ min: 4 })
		.escape()
		.withMessage('Username must be at least 4 characters')
		.isAlphanumeric()
		.withMessage('Username has non-alphanumeric characters.')
		.custom((value) =>
			User.exists({ username: value }).then((user) => {
				if (user) {
					return Promise.reject(new Error('Username already taken.'));
				}
				return true;
			})
		),
	body('password')
		.isLength({ min: 5 })
		.withMessage('Password must be at least 5 charaacters'),
	body('confirmPassword').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Passwords must match.');
		} else return true;
	}),

	async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.render('register', {
					title: 'Register',
					user: req.body,
					errors: errors.array(),
				});
			} else {
				bcrypt.hash(req.body.password, 10, (error, hashedPassword) => {
					if (error) return next(error);
					const user = new User({
						username: req.body.username,
						password: hashedPassword,
					});
					user.save();
					res.render('login', {
						title: 'Login Form',
						success: 'Register successful. Please login.',
					});
				});
			}
		} catch (error) {
			next(error);
		}
	},
];

const membershipPost = [
	body('membership')
		.trim()
		.escape()
		.custom((value) => {
			if (value !== 'ilikecats') {
				throw new Error("That's not the correct secret password.");
			} else return true;
		}),
	async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.render('membership', {
					user: res.locals.currentUser,
					errors: errors.array(),
				});
			} else {
				await User.findByIdAndUpdate(req.user._id, {
					member: true,
				}).exec();
				res.render('membership', {
					user: res.locals.currentUser,
					success: 'You can now view who posted the messages.',
				});
			}
		} catch (error) {
			next(error);
		}
	},
];

const adminPost = [
	body('admin')
		.trim()
		.escape()
		.custom((value) => {
			if (value !== 'catsarecool') {
				throw new Error("That's not the correct secret password.");
			} else return true;
		}),
	async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.render('admin', {
					user: res.locals.currentUser,
					errors: errors.array(),
				});
			} else {
				await User.findByIdAndUpdate(req.user._id, {
					admin: true,
				}).exec();
				res.render('admin', {
					user: res.locals.currentUser,
					success: 'You can now delete your own posts.',
				});
			}
		} catch (error) {
			next(error);
		}
	},
];

export { registerPost, membershipPost, adminPost };

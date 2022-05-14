import { body, validationResult } from 'express-validator';
import Message from '../models/message.js';
import User from '../models/user.js';

const messageList = async (req, res, next) => {
	try {
		const messages = await Message.find()
			.populate('username')
			.sort([['timestamp', 'descending']])
			.exec();
		res.render('index', {
			title: 'Memers Only',
			user: res.locals.currentUser,
			messages,
		});
	} catch (error) {
		next(error);
	}
};

const messagePost = [
	body('text').isLength({ min: 1 }).escape().withMessage("Text can't be empty"),
	async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.render('index', {
					title: 'Members Only',
					user: res.locals.currentUser,
					errors: errors.array(),
				});
			} else {
				const message = new Message({
					username: res.locals.currentUser._id,
					title: req.body.title,
					message: req.body.text,
				});
				message.save();
				res.redirect('/');
			}
		} catch (error) {
			next(error);
		}
	},
];

const deleteMessege = async (req, res, next) => {
	try {
		await Message.findByIdAndDelete(req.params.id).exec();
		res.redirect('/');
	} catch (error) {
		next(error);
	}
};

export { messagePost, messageList, deleteMessege };

import express from 'express';
import { registerPost } from '../controllers/usercontroller.js';

const router = express.Router();

router.get('/', (req, res) => {
	res.render('register', {
		title: 'Registration',
	});
});

router.post('/', registerPost);

export default router;

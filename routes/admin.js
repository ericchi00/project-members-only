import express from 'express';
import { adminPost } from '../controllers/usercontroller.js';

const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('admin', { user: res.locals.currentUser });
});

router.post('/', adminPost);

export default router;

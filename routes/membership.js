import express from 'express';
import { membershipPost } from '../controllers/usercontroller.js';

const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('membership', { user: res.locals.currentUser });
});

router.post('/', membershipPost);

export default router;

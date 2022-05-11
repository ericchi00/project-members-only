import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('admin', { user: res.locals.currentUser });
});

export default router;

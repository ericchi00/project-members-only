import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
	req.logout();
	res.redirect('/');
});

export default router;

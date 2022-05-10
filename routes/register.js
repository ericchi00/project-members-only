import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
	res.render('register', {
		title: 'Registration',
	});
});

router.post('/');

export default router;

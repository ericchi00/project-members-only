import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
	res.render('sign-up', {
		title: 'Registration',
	});
});

export default router;

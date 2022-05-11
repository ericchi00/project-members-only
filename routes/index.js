import express from 'express';

const router = express.Router();

/* GET index page. */
router.get('/', (req, res) => {
	res.render('index', {
		title: 'Only Memers',
		user: req.user,
	});
});

export default router;

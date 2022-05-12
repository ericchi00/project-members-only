import express from 'express';
import {
	deleteMessege,
	messageList,
	messagePost,
} from '../controllers/messagecontroller.js';

const router = express.Router();

router.get('/', messageList);

router.post('/', messagePost);

router.get('/delete/:id', deleteMessege);

export default router;

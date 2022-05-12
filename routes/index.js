import express from 'express';
import {
	deleteMessegePost,
	messageList,
	messagePost,
} from '../controllers/messagecontroller.js';

const router = express.Router();

router.get('/', messageList);

router.post('/', messagePost);

router.get('/delete/:id', deleteMessegePost);

export default router;

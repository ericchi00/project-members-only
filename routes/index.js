import express from 'express';
import { messageList, messagePost } from '../controllers/messagecontroller.js';

const router = express.Router();

router.get('/', messageList);

router.post('/', messagePost);

export default router;

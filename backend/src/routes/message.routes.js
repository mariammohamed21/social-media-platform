import express from 'express';
import { getConversations, getMessages, sendMessage } from '../controllers/message.controller.js';
import { protect } from '../middleware/auth.middleware.js';
const router = express.Router();
router.get('/conversations', protect, getConversations);
router.get('/:conversationId', protect, getMessages);
router.post('/', protect, sendMessage);
export default router;

import express from 'express';
import { getNotifications, markRead, unreadCount } from '../controllers/notification.controller.js';
import { protect } from '../middleware/auth.middleware.js';
const router = express.Router();
router.get('/', protect, getNotifications);
router.get('/unread-count', protect, unreadCount);
router.put('/read', protect, markRead);
export default router;

import express from 'express';
import { addComment, getComments } from '../controllers/comment.controller.js';
import { protect } from '../middleware/auth.middleware.js';
const router = express.Router();
router.get('/:postId', getComments);
router.post('/:postId', protect, addComment);
export default router;

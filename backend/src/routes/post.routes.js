import express from 'express';
import { createPost, deletePost, getPosts, toggleLike, updatePost } from '../controllers/post.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';
const router = express.Router();
router.route('/').get(getPosts).post(protect, upload.single('image'), createPost);
router.route('/:id').put(protect, upload.single('image'), updatePost).delete(protect, deletePost);
router.post('/:id/like', protect, toggleLike);
export default router;

import express from 'express';
import { getProfile, getUserPosts, updateProfile } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';
const router = express.Router();
router.get('/:username', getProfile);
router.get('/:username/posts', getUserPosts);
router.put('/me/profile', protect, upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }]), updateProfile);
export default router;

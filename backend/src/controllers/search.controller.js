import User from '../models/User.js';
import Post from '../models/Post.js';

export const globalSearch = async (req, res, next) => {
  try {
    const q = req.query.q || '';
    const users = await User.find({ $or: [{ name: { $regex: q, $options: 'i' } }, { username: { $regex: q, $options: 'i' } }] }).select('-password').limit(10);
    const posts = await Post.find({ $or: [{ content: { $regex: q, $options: 'i' } }, { tags: q.toLowerCase() }] }).populate('author', 'name username avatar').limit(20).sort('-createdAt');
    res.json({ users, posts });
  } catch (error) { next(error); }
};

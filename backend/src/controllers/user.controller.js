import User from '../models/User.js';
import Post from '../models/Post.js';

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password').populate('followers following', 'name username avatar');
    if (!user) { res.status(404); throw new Error('User not found'); }
    res.json(user);
  } catch (error) { next(error); }
};

export const updateProfile = async (req, res, next) => {
  try {
    const fields = ['name', 'bio', 'username'];
    fields.forEach(f => { if (req.body[f] !== undefined) req.user[f] = req.body[f]; });
    if (req.files?.avatar?.[0]) req.user.avatar = `/uploads/${req.files.avatar[0].filename}`;
    if (req.files?.coverImage?.[0]) req.user.coverImage = `/uploads/${req.files.coverImage[0].filename}`;
    const updated = await req.user.save();
    res.json({ id: updated._id, name: updated.name, username: updated.username, email: updated.email, bio: updated.bio, avatar: updated.avatar, coverImage: updated.coverImage });
  } catch (error) { next(error); }
};

export const getUserPosts = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) { res.status(404); throw new Error('User not found'); }
    const posts = await Post.find({ author: user._id }).sort('-createdAt').populate('author', 'name username avatar');
    res.json(posts);
  } catch (error) { next(error); }
};

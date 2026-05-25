import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import Notification from '../models/Notification.js';

export const createPost = async (req, res, next) => {
  try {
    const { content, tags } = req.body;
    if (!content) { res.status(400); throw new Error('Post content is required'); }
    const post = await Post.create({
      author: req.user._id,
      content,
      image: req.file ? `/uploads/${req.file.filename}` : '',
      tags: tags ? tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean) : []
    });
    const populated = await post.populate('author', 'name username avatar');
    res.status(201).json(populated);
  } catch (error) { next(error); }
};

export const getPosts = async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const q = req.query.q;
    const filter = q ? { $or: [{ content: { $regex: q, $options: 'i' } }, { tags: q.toLowerCase() }] } : {};
    const posts = await Post.find(filter).sort('-createdAt').skip((page - 1) * limit).limit(limit).populate('author', 'name username avatar');
    const total = await Post.countDocuments(filter);
    res.json({ posts, page, pages: Math.ceil(total / limit), total });
  } catch (error) { next(error); }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) { res.status(404); throw new Error('Post not found'); }
    if (post.author.toString() !== req.user._id.toString()) { res.status(403); throw new Error('Not allowed'); }
    post.content = req.body.content ?? post.content;
    post.tags = req.body.tags ? req.body.tags.split(',').map(t => t.trim().toLowerCase()) : post.tags;
    if (req.file) post.image = `/uploads/${req.file.filename}`;
    const saved = await post.save();
    res.json(await saved.populate('author', 'name username avatar'));
  } catch (error) { next(error); }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) { res.status(404); throw new Error('Post not found'); }
    if (post.author.toString() !== req.user._id.toString()) { res.status(403); throw new Error('Not allowed'); }
    await Comment.deleteMany({ post: post._id });
    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (error) { next(error); }
};

export const toggleLike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name username avatar');
    if (!post) { res.status(404); throw new Error('Post not found'); }
    const liked = post.likes.some(id => id.toString() === req.user._id.toString());
    post.likes = liked ? post.likes.filter(id => id.toString() !== req.user._id.toString()) : [...post.likes, req.user._id];
    await post.save();
    if (!liked && post.author._id.toString() !== req.user._id.toString()) {
      await Notification.create({ recipient: post.author._id, sender: req.user._id, type: 'like', post: post._id, text: `${req.user.name} liked your post` });
    }
    res.json(post);
  } catch (error) { next(error); }
};

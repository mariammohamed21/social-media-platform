import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import Notification from '../models/Notification.js';

export const addComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).populate('author', 'name username avatar');
    if (!post) { res.status(404); throw new Error('Post not found'); }
    const comment = await Comment.create({ post: post._id, author: req.user._id, text: req.body.text });
    if (post.author._id.toString() !== req.user._id.toString()) {
      await Notification.create({ recipient: post.author._id, sender: req.user._id, type: 'comment', post: post._id, text: `${req.user.name} commented on your post` });
    }
    res.status(201).json(await comment.populate('author', 'name username avatar'));
  } catch (error) { next(error); }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).sort('createdAt').populate('author', 'name username avatar');
    res.json(comments);
  } catch (error) { next(error); }
};

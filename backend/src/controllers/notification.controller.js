import Notification from '../models/Notification.js';

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id }).sort('-createdAt').populate('sender', 'name username avatar');
    res.json(notifications);
  } catch (error) { next(error); }
};

export const markRead = async (req, res, next) => {
  try {
    await Notification.updateMany({ recipient: req.user._id, read: false }, { read: true });
    res.json({ message: 'Notifications marked as read' });
  } catch (error) { next(error); }
};

export const unreadCount = async (req, res, next) => {
  try {
    const count = await Notification.countDocuments({ recipient: req.user._id, read: false });
    res.json({ count });
  } catch (error) { next(error); }
};

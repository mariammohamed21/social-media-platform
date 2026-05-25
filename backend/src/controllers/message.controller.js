import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import Notification from '../models/Notification.js';

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({ participants: req.user._id })
      .populate('participants', 'name username avatar')
      .populate('lastMessage')
      .sort('-updatedAt');
    res.json(conversations);
  } catch (error) { next(error); }
};

export const getMessages = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ _id: req.params.conversationId, participants: req.user._id });
    if (!conversation) { res.status(404); throw new Error('Conversation not found'); }
    const messages = await Message.find({ conversation: conversation._id }).sort('createdAt').populate('sender receiver', 'name username avatar');
    res.json(messages);
  } catch (error) { next(error); }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { receiverId, text } = req.body;
    let conversation = await Conversation.findOne({ participants: { $all: [req.user._id, receiverId] } });
    if (!conversation) conversation = await Conversation.create({ participants: [req.user._id, receiverId] });
    const message = await Message.create({ conversation: conversation._id, sender: req.user._id, receiver: receiverId, text });
    conversation.lastMessage = message._id;
    await conversation.save();
    await Notification.create({ recipient: receiverId, sender: req.user._id, type: 'message', message: message._id, text: `${req.user.name} sent you a message` });
    res.status(201).json(await message.populate('sender receiver', 'name username avatar'));
  } catch (error) { next(error); }
};

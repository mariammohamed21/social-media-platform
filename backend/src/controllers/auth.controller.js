import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { sendEmail } from '../utils/sendEmail.js';

const userPayload = (user) => ({ id: user._id, name: user.name, username: user.username, email: user.email, bio: user.bio, avatar: user.avatar });

export const register = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) { res.status(400); throw new Error('All fields are required'); }
    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) { res.status(409); throw new Error('Email or username already exists'); }
    const user = await User.create({ name, username, email, password });
    await sendEmail({ to: email, subject: 'Welcome to Social Platform', html: `<h2>Welcome ${name}</h2><p>Your account has been created.</p>` });
    res.status(201).json({ user: userPayload(user), token: generateToken(user._id) });
  } catch (error) { next(error); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) { res.status(401); throw new Error('Invalid email or password'); }
    res.json({ user: userPayload(user), token: generateToken(user._id) });
  } catch (error) { next(error); }
};

export const me = async (req, res) => res.json({ user: req.user });

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../src/models/User.js';
import Post from '../src/models/Post.js';
import connectDB from '../src/config/db.js';

dotenv.config();
await connectDB();
await User.deleteMany();
await Post.deleteMany();
const fares = await User.create({ name: 'Fares Aymen', username: 'fares', email: 'fares@example.com', password: '123456', bio: 'Full-stack developer' });
const sara = await User.create({ name: 'Sara Mohamed', username: 'sara', email: 'sara@example.com', password: '123456', bio: 'UI/UX Designer' });
await Post.create([
  { author: fares._id, content: 'Welcome to my new social media platform!', tags: ['welcome','react'] },
  { author: sara._id, content: 'Design is not just how it looks, it is how it works.', tags: ['design','ux'] }
]);
console.log('Seed data inserted. Login: fares@example.com / 123456');
await mongoose.disconnect();

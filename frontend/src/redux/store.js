import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import postsReducer from './slices/postsSlice.js';
import notificationsReducer from './slices/notificationsSlice.js';
import themeReducer from './slices/themeSlice.js';

export const store = configureStore({
  reducer: { auth: authReducer, posts: postsReducer, notifications: notificationsReducer, theme: themeReducer }
});

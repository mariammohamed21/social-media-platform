import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api.js';
export const fetchUnreadCount = createAsyncThunk('notifications/count', async()=> (await api.get('/notifications/unread-count')).data.count);
const slice=createSlice({name:'notifications', initialState:{unread:0}, reducers:{}, extraReducers:b=>b.addCase(fetchUnreadCount.fulfilled,(s,a)=>{s.unread=a.payload})});
export default slice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api.js';

export const fetchPosts = createAsyncThunk('posts/fetch', async (q='') => (await api.get(`/posts${q ? `?q=${q}` : ''}`)).data);
export const createPost = createAsyncThunk('posts/create', async (formData) => (await api.post('/posts', formData)).data);
export const toggleLike = createAsyncThunk('posts/like', async (id) => (await api.post(`/posts/${id}/like`)).data);
const slice = createSlice({
  name:'posts', initialState:{ items:[], loading:false, error:null }, reducers:{},
  extraReducers:b=>b
    .addCase(fetchPosts.pending,s=>{s.loading=true})
    .addCase(fetchPosts.fulfilled,(s,a)=>{s.loading=false; s.items=a.payload.posts || a.payload})
    .addCase(createPost.fulfilled,(s,a)=>{s.items.unshift(a.payload)})
    .addCase(toggleLike.fulfilled,(s,a)=>{const i=s.items.findIndex(p=>p._id===a.payload._id); if(i>=0)s.items[i]=a.payload})
});
export default slice.reducer;

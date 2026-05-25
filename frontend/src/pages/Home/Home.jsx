import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/slices/postsSlice.js';
import { fetchUnreadCount } from '../../redux/slices/notificationsSlice.js';
import PostForm from '../../components/posts/PostForm.jsx';
import PostCard from '../../components/posts/PostCard.jsx';
export default function Home(){const dispatch=useDispatch(); const {items,loading}=useSelector(s=>s.posts); useEffect(()=>{dispatch(fetchPosts()); dispatch(fetchUnreadCount())},[dispatch]); return <><PostForm/>{loading?<p>Loading...</p>:items.map(p=><PostCard key={p._id} post={p}/>)}</>}

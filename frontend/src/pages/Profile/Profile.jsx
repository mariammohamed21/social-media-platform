import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api.js';
import PostCard from '../../components/posts/PostCard.jsx';
export default function Profile(){const {username}=useParams(); const [user,setUser]=useState(null); const [posts,setPosts]=useState([]); useEffect(()=>{api.get(`/users/${username}`).then(r=>setUser(r.data)); api.get(`/users/${username}/posts`).then(r=>setPosts(r.data))},[username]); if(!user)return <p>Loading...</p>; return <><div className="profile-header card card-body mb-3"><h2>{user.name}</h2><p>@{user.username}</p><p>{user.bio}</p></div>{posts.map(p=><PostCard key={p._id} post={p}/>)}</>}

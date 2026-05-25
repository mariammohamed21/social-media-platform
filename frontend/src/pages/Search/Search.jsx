import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../../services/api.js';
import PostCard from '../../components/posts/PostCard.jsx';
export default function Search(){const [params]=useSearchParams(); const q=params.get('q')||''; const [data,setData]=useState({users:[],posts:[]}); useEffect(()=>{api.get(`/search?q=${q}`).then(r=>setData(r.data))},[q]); return <><h3>Search: {q}</h3><h5>Users</h5>{data.users.map(u=><Link className="d-block" key={u._id} to={`/profile/${u.username}`}>{u.name} @{u.username}</Link>)}<h5 className="mt-3">Posts</h5>{data.posts.map(p=><PostCard key={p._id} post={p}/>)}</>}

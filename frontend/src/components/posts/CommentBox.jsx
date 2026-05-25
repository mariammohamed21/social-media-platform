import { useEffect, useState } from 'react';
import api from '../../services/api.js';
export default function CommentBox({postId}){const [comments,setComments]=useState([]); const [text,setText]=useState('');
 useEffect(()=>{api.get(`/comments/${postId}`).then(r=>setComments(r.data))},[postId]);
 const submit=async e=>{e.preventDefault(); if(!text.trim())return; const {data}=await api.post(`/comments/${postId}`,{text}); setComments([...comments,data]); setText('')};
 return <div className="mt-3"><form onSubmit={submit} className="d-flex gap-2"><input value={text} onChange={e=>setText(e.target.value)} className="form-control form-control-sm" placeholder="Write a comment"/><button className="btn btn-sm btn-secondary">Send</button></form>{comments.map(c=><div key={c._id} className="small mt-2"><b>{c.author?.name}:</b> {c.text}</div>)}</div>}

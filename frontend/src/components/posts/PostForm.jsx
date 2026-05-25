import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/slices/postsSlice.js';
export default function PostForm(){const [content,setContent]=useState(''); const [tags,setTags]=useState(''); const [image,setImage]=useState(null); const dispatch=useDispatch();
 const submit=e=>{e.preventDefault(); const fd=new FormData(); fd.append('content',content); fd.append('tags',tags); if(image)fd.append('image',image); dispatch(createPost(fd)); setContent(''); setTags(''); setImage(null)};
 return <form onSubmit={submit} className="card card-body mb-3 shadow-sm"><textarea className="form-control" rows="3" value={content} onChange={e=>setContent(e.target.value)} placeholder="What is happening?" required/><div className="d-flex gap-2 mt-2"><input className="form-control" value={tags} onChange={e=>setTags(e.target.value)} placeholder="tags comma separated"/><input className="form-control" type="file" onChange={e=>setImage(e.target.files[0])}/><button className="btn btn-primary">Post</button></div></form>}

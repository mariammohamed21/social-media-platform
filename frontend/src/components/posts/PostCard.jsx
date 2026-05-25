import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '../../redux/slices/postsSlice.js';
import CommentBox from './CommentBox.jsx';
const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api','');
export default function PostCard({post}){const dispatch=useDispatch(); const {user}=useSelector(s=>s.auth); const liked=post.likes?.some(id=>(id._id||id)===user?.id); return <div className="card mb-3 shadow-sm"><div className="card-body">
  <div className="d-flex align-items-center gap-2 mb-2"><div className="avatar">{post.author?.name?.[0]}</div><div><strong>{post.author?.name}</strong><div className="text-muted small">@{post.author?.username}</div></div></div>
  <p>{post.content}</p>{post.image && <img className="post-img" src={`${API_BASE}${post.image}`} />}
  <div className="d-flex gap-2 mt-3"><button onClick={()=>dispatch(toggleLike(post._id))} className={`btn btn-sm ${liked?'btn-primary':'btn-outline-primary'}`}>Like ({post.likes?.length||0})</button></div>
  <CommentBox postId={post._id}/>
</div></div>}

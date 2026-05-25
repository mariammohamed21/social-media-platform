import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice.js';
import { toggleTheme } from '../../redux/slices/themeSlice.js';

export default function Navbar(){
  const { user }=useSelector(s=>s.auth); const { unread }=useSelector(s=>s.notifications); const dispatch=useDispatch(); const nav=useNavigate();
  const onSearch=e=>{e.preventDefault(); const q=e.currentTarget.q.value.trim(); if(q) nav(`/search?q=${encodeURIComponent(q)}`)};
  return <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom sticky-top"><div className="container">
    <Link className="navbar-brand fw-bold" to="/">SocialPro</Link>
    {user && <form onSubmit={onSearch} className="d-flex ms-auto me-3"><input name="q" className="form-control" placeholder="Search..."/></form>}
    <div className="d-flex gap-2 align-items-center">
      <button className="btn btn-outline-secondary btn-sm" onClick={()=>dispatch(toggleTheme())}>Theme</button>
      {user ? <><Link to="/messages" className="btn btn-outline-primary btn-sm">Messages</Link><Link to="/notifications" className="btn btn-outline-warning btn-sm">Notifications {unread>0 && <span className="badge bg-danger">{unread}</span>}</Link><Link to={`/profile/${user.username}`} className="btn btn-outline-dark btn-sm">{user.name}</Link><button onClick={()=>dispatch(logout())} className="btn btn-danger btn-sm">Logout</button></> : <Link to="/login" className="btn btn-primary btn-sm">Login</Link>}
    </div></div></nav>
}

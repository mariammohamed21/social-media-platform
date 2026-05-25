import { useEffect, useState } from 'react';
import api from '../../services/api.js';
export default function Notifications(){const [items,setItems]=useState([]); useEffect(()=>{api.get('/notifications').then(r=>setItems(r.data)); api.put('/notifications/read')},[]); return <div className="card card-body"><h3>Notifications</h3>{items.map(n=><div key={n._id} className={`border-bottom py-2 ${!n.read?'fw-bold':''}`}>{n.text}<div className="text-muted small">{new Date(n.createdAt).toLocaleString()}</div></div>)}</div>}

import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import Home from '../pages/Home/Home.jsx';
import Login from '../pages/Auth/Login.jsx';
import Register from '../pages/Auth/Register.jsx';
import Profile from '../pages/Profile/Profile.jsx';
import Messages from '../pages/Messages/Messages.jsx';
import Notifications from '../pages/Notifications/Notifications.jsx';
import Search from '../pages/Search/Search.jsx';

export default function AppRoutes(){return <Routes>
  <Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/>
  <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
  <Route path="/profile/:username" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
  <Route path="/messages" element={<ProtectedRoute><Messages/></ProtectedRoute>}/>
  <Route path="/notifications" element={<ProtectedRoute><Notifications/></ProtectedRoute>}/>
  <Route path="/search" element={<ProtectedRoute><Search/></ProtectedRoute>}/>
</Routes>}

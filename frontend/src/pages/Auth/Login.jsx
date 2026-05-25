import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { login } from '../../redux/slices/authSlice.js';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await dispatch(login(form)).unwrap();
      nav('/');
    } catch (err) {
      setError(err || 'Login failed');
    }
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <form onSubmit={submit}>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <div className="input-group mb-2">
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />} 
          </button>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>

      <div className="mt-3">
        <Link to="/register">Create new account</Link>
      </div>
    </div>
  );
}
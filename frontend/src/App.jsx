import { useSelector } from 'react-redux';
import AppRoutes from './routes/AppRoutes.jsx';
import Navbar from './components/layout/Navbar.jsx';

export default function App() {
  const { mode } = useSelector(state => state.theme);
  return <div className={`app ${mode}`}><Navbar /><main className="container py-4"><AppRoutes /></main></div>;
}

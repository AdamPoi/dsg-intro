import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import BaseLayout from './layouts/BaseLayout';
import { AuthRoute } from './routes/Index';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './hooks/useAuth';

const App: React.FC = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  </AuthProvider>
);

export default App;

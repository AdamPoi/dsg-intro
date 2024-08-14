import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Dashboard';
import BaseLayout from './layouts/BaseLayout';

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<BaseLayout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  </Routes>
);

export default App;

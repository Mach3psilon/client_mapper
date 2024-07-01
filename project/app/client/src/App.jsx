import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropertyHome from './views/PropertyHome.jsx';
import UserLogin from './components/UserLogin.jsx';
import PrivateRoute from './PrivateRoute.jsx';

function App() {
  // Access the authentication state from the Redux store
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route
        path="/"
        element={<PrivateRoute component={PropertyHome} isAuthenticated={isAuthenticated} />}
      />
      <Route path="/login" element={<UserLogin />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

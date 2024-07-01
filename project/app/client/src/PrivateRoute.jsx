import { Navigate } from 'react-router-dom';

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
}

export default PrivateRoute;

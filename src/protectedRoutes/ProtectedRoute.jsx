import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { authContext } from '../contexts/authContext';

/**
 * A single route guard that handles both directions:
 *   - requireAuth=true  → redirect to /login if not logged in
 *   - requireAuth=false → redirect to /   if already logged in
 */
export default function ProtectedRoute({ children, requireAuth = true }) {
    const { isLoggedIn } = useContext(authContext);

    // if (requireAuth && !isLoggedIn) return <Navigate to="/login" replace />;
    if (!requireAuth && isLoggedIn) return <Navigate to="/" replace />;

    return children;
}

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { toast } from 'react-toastify';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useSelector((state) => state.user);

    if (!isAuthenticated) {
        toast.error('Please login to continue');
        return <Navigate to="/auth" replace />;
    }

    return children;
}
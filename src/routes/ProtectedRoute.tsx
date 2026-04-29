import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

const ProtectedRoute = () => {
  const { user, loading } = useAppSelector((state) => state.auth);

  // 1. If Firebase is still checking the session, show nothing or a spinner
  // This prevents the "flash" of the dashboard before redirecting
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // 2. If no user session exists, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. If user exists, render the dashboard pages (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;

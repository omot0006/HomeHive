import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoadingState } from "../../../components/ui";
import useAuth from "../hooks/useAuth";

function ProtectedRoute() {
  const { isAuthenticated, isInitializing } = useAuth();
  const location = useLocation();

  if (isInitializing) return <main className="flex min-h-dvh items-center justify-center bg-hive-canvas"><LoadingState label="Restoring your Hive…" /></main>;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}

export default ProtectedRoute;


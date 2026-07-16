import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function HiveSetupRoute() {
  const { hasHive } = useAuth();
  return hasHive ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

export default HiveSetupRoute;

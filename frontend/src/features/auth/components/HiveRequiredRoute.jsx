import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function HiveRequiredRoute() {
  const { hasHive } = useAuth();
  return hasHive ? <Outlet /> : <Navigate to="/create-hive" replace />;
}

export default HiveRequiredRoute;

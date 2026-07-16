import { useContext } from "react";
import AuthContextStore from "../context/AuthContextStore";

const useAuth = () => {
  const context = useContext(AuthContextStore);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
};

export default useAuth;

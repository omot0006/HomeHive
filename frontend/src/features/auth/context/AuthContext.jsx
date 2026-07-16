import { useCallback, useEffect, useMemo, useState } from "react";
import { clearStoredToken, getStoredToken, storeToken } from "../../../services/httpClient";
import { getCurrentUser, loginUser, registerUser, updateCurrentUser } from "../services/authApi";
import AuthContextStore from "./AuthContextStore";
import { userHasHive } from "../utils/authDestination";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(Boolean(getStoredToken()));

  const clearSession = useCallback(() => {
    clearStoredToken();
    setUser(null);
    setIsInitializing(false);
  }, []);

  useEffect(() => {
    const restoreSession = async () => {
      if (!getStoredToken()) return;
      try {
        setUser(await getCurrentUser());
      } catch {
        clearSession();
      } finally {
        setIsInitializing(false);
      }
    };

    restoreSession();
    window.addEventListener("homehive:unauthorized", clearSession);
    return () => window.removeEventListener("homehive:unauthorized", clearSession);
  }, [clearSession]);

  const establishSession = useCallback(async (request, credentials) => {
    const result = await request(credentials);
    storeToken(result.token);
    setUser(result.user);
    return result.user;
  }, []);

  const updateProfile = useCallback(async (details) => {
    const updatedUser = await updateCurrentUser(details);
    setUser(updatedUser);
    return updatedUser;
  }, []);

  const refreshUser = useCallback(async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    return currentUser;
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    hasHive: userHasHive(user),
    isInitializing,
    login: (credentials) => establishSession(loginUser, credentials),
    register: (details) => establishSession(registerUser, details),
    updateProfile,
    refreshUser,
    logout: clearSession,
  }), [clearSession, establishSession, isInitializing, refreshUser, updateProfile, user]);

  return <AuthContextStore.Provider value={value}>{children}</AuthContextStore.Provider>;
}

export default AuthProvider;

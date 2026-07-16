import { useCallback, useEffect, useMemo, useState } from "react";
import { getMyHive } from "../services/hiveApi";
import HiveContextStore from "./HiveContextStore";

function HiveProvider({ children }) {
  const [hive, setHive] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshHive = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const currentHive = await getMyHive();
      setHive(currentHive);
      return currentHive;
    } catch (requestError) {
      setError(requestError.response?.data?.error?.message ?? "Unable to load your Hive.");
      throw requestError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isActive = true;
    getMyHive()
      .then((currentHive) => { if (isActive) setHive(currentHive); })
      .catch((requestError) => {
        if (isActive) setError(requestError.response?.data?.error?.message ?? "Unable to load your Hive.");
      })
      .finally(() => { if (isActive) setIsLoading(false); });
    return () => { isActive = false; };
  }, []);

  const value = useMemo(() => ({ hive, isLoading, error, refreshHive }), [error, hive, isLoading, refreshHive]);
  return <HiveContextStore.Provider value={value}>{children}</HiveContextStore.Provider>;
}

export default HiveProvider;

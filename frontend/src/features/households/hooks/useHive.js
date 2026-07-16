import { useContext } from "react";
import HiveContextStore from "../context/HiveContextStore";

const useHive = () => {
  const context = useContext(HiveContextStore);
  if (!context) throw new Error("useHive must be used within HiveProvider.");
  return context;
};

export default useHive;

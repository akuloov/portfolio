import useStore from "@/stateStorage/storage";
import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/firebase/firebase.config";

export default function useIsAuthenticated() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useStore((state) => state.setIsAuthenticated);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return {
    isAuthenticated,
    setIsAuthenticated,
  };
}
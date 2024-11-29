"use client"

import {useRouter} from 'next/navigation';
import {CircularProgress} from '@mui/material';
import React, {useEffect, useState} from "react";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from "@/firebase/firebase.config";
import LinkButton from "@/components/LinkButton";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login'); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <CircularProgress/>; // Show a loading spinner while checking authentication
  }

  return (
    <>
      <LinkButton
        route={"/login"}
        className="absolute right-0 top-0 z-10 rounded-none text-white rounded-bl p-1.5"
        text="Logout"
        onClick={async () => await signOut(auth)}
      />
      <main
        className="gap-2 sm:gap-2 md:gap-3 lg:gap-4 flex flex-col text-white m-auto p-2 max-w-xl overflow-hidden relative w-full transition-all sm:p-4 md:p-6 md:mt-4">
        <LinkButton route={"/"}/>
      </main>
    </>
  );
};

export default Admin;
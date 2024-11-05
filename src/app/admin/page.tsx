"use client"

import {useRouter} from 'next/navigation';
import {CircularProgress} from '@mui/material';
import React, {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/firebase/firebase.config";

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
    <div>
      <h1>Admin Page</h1>
    </div>
  );
};

export default Admin;
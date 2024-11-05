"use client"

import React, {useState} from "react";
import {auth} from "@/firebase/firebase.config"; // Adjust path if needed
import {signInWithEmailAndPassword} from "firebase/auth";
import {useRouter} from 'next/navigation'
import {Button, TextField} from "@mui/material";
import LinkButton from "@/components/LinkButton";

const Login: React.FC = ({onLoginSuccess}: { onLoginSuccess?: () => void }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess?.(); // Optional callback if needed
      router.push("/admin"); // Redirect to admin dashboard on successful login
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <main
      className="gap-2 sm:gap-2 md:gap-3 lg:gap-4 flex flex-col text-white m-auto p-2 max-w-xl overflow-hidden relative w-full transition-all sm:p-4 md:p-6 md:mt-4">
      <LinkButton route={"/"} className=""/>
      <form onSubmit={handleLogin}>
        <div className="bg-white w-64 p-6 mt-6 m-auto rounded flex flex-col gap-6">
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            className="w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            variant="contained"
            type="submit"
          >Log in</Button>
          {error && <p className="text-red-600">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default Login;
import { createContext, useState, useEffect } from "react";
import type { User } from "../types";
import { apiClient } from "../clients/api";

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  logIn: (username: string, password: string) => void;
  register: (username: string, email: string, password: string) => void;
  logOut: () => void;
  token: string | null;
  setToken: (token: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  // Check if there is a user in localStorage and set it in state
  const [user, setUser] = useState<User | null>(() => {
    try {
      const value = localStorage.getItem("user");
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
   // Check if there is a token in localStorage and get it 
      const value = localStorage.getItem("token");
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

// If token exists on load, set default Authorization header
  
  useEffect(() => {
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("Auth header (from useEffect):", apiClient.defaults.headers.common["Authorization"]);
    } else {
      delete apiClient.defaults.headers.common["Authorization"];
    }
  }, [token]);
  

  const logIn = async (email: string, password: string) => {
    const res = await apiClient.post("/api/users/login", {email, password})
    console.log("LOGIN RESPONSE:", res.data);

    const {user, token} = res.data;
    // setting user & token
    setUser(user);
    setToken(token);

    // registering user & token in local storage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));

    // setting token in Aurothorization page
    console.log(`Bearer ${token}`);
    
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("Auth header set to:", apiClient.defaults.headers.common["Authorization"]);
  };

  const register = async (username: string, email: string, password: string) => {
    const res = await apiClient.post("/api/users/register", {username,email, password })
    console.log("LOGIN RESPONSE:", res.data);
    const {user,token} = res.data;
    setToken(token);
    setUser(user);

    // registering user & token in local storage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));  

     // setting token in Aurothorization page
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const logOut = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    delete apiClient.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, logIn, register, logOut, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
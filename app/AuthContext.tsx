'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  // ao iniciar, verifica se há token no sessionStorage
  useEffect(() => {
    async ()=>{
      const storedToken = sessionStorage.getItem("token");
      
      if (storedToken) setToken(storedToken);
      
    }
  }, []);

  // função de login
  const login = (newToken: string) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // função de logout
  const logout = () => {
    sessionStorage.removeItem("token");
    
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// hook personalizado para facilitar o uso
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

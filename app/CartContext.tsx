'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface CartContextType {
  cart: any[];
  saveCart: ([]) => void;
  addToCart: (a:any) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);

  // ao iniciar, verifica se há token no sessionStorage
  useEffect(() => {
    //fetch cart
  }, []);

  const addToCart = (a:any) =>{
    setCart([...cart, a])
  }
  // função de login
  const saveCart = ([]) => {
    //post array
  };


  return (
    <CartContext.Provider value={{ cart, saveCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

// hook personalizado para facilitar o uso
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}

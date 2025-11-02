'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import jwt from 'jsonwebtoken';
import { Items } from "./(private)/market/Market";
interface CartContextType {
  cart: any[];
  saveCart: ([]) => void;
  addToCart: (a:Items) => void;
  clearCart: (a:Items[])=>void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Items[]>([]);

  // ao iniciar, verifica se há token no sessionStorage
  useEffect(() => {
  }, []);

  const addToCart = (a:Items) =>{
    setCart([...cart, a])
  }
  // função de login
  const saveCart = ([]) => {
    //post array
  };

  const clearCart  = (a:Items[]) =>{
    setCart(a)
  }

  return (
    <CartContext.Provider value={{ cart, saveCart, addToCart,  clearCart }}>
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

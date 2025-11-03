'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import jwt from 'jsonwebtoken';
import { Items } from "./(private)/market/Market";
import { jwtDecode } from "jwt-decode";
interface CartContextType {
  cart: any[];
  saveCart: () => void;
  addToCart: (a:Items) => void;
  clearCart: (a:Items[])=>void;
  addArrayToCart: (a:Items[])=>void;
  finalizarCompra: (cpf:string)=>void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Items[]>([]);

  // ao iniciar, verifica se há token no sessionStorage
  useEffect(() => {
    saveCart()
  }, [cart]);

  const addToCart = (a:Items) =>{
    setCart([...cart, a])
  }
  const addArrayToCart = (a:Items[]) =>{
    setCart([...cart, ...a])
  }
  // função de login
  const saveCart = () => {
    (async () => {
      const sessionDecoded = sessionStorage.getItem("token");
      if(sessionDecoded){
        const session:any = jwtDecode(sessionDecoded);
        await fetch(`http://localhost:3001/carrinho/${session.sub}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            Products: cart
          }),
        });
      }
    })()
  };

  const clearCart  = (a:Items[]) =>{
    setCart(a)
  }

  const finalizarCompra = (cpf:string) => {
    (async () => {
      const sessionDecoded = sessionStorage.getItem("token");
      if(sessionDecoded){
        const session:any = jwtDecode(sessionDecoded);
        await fetch(`http://localhost:3001/compra`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            cpf: cpf,
            Pessoa_id: session.sub,
            total_price: 0,
            produtos: cart
          }),
        });

        clearCart([])
      }
    })()
  }
  return (
    <CartContext.Provider value={{ cart, saveCart, addToCart,  clearCart, addArrayToCart, finalizarCompra}}>
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

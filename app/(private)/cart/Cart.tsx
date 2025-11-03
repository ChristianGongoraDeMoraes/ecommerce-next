'use client'

import { useCart } from "@/app/CartContext";
import ItemCart from "./ItemCart";
import { Items } from "../market/Market";
import { useEffect, useState } from "react";

export function Cart() {
  const cart = useCart()
  const [cartState, setCartState] = useState<any[]>([]);
    useEffect(()=>{
        setCartState(cart.cart)
    },[cart.cart])

    const handleRemoveToCart = (i:Items) =>{
        let found = false
        const mpRemoved:Items[] = []
        const cartArray = [...cart.cart];
        cartArray.forEach((mp)=>{
            if(i.id == mp.id && !(found)){
                found = true
            }else{
                mpRemoved.push(mp)
                
            }
        })
        cart.clearCart([...mpRemoved]) 
    }
  return (
    <div className="flex w-full gap-5 flex-wrap flex-col items-center justify-center bg-gray-300/40 rounded-lg">
            <div>
                <h1 className="text-lg m-6 font-bold">
                    Meu carrinho
                </h1>
            </div>
        <div className="w-[60%] m-auto rounded-lg flex items-center justify-center flex-col bg-gray-400/40 p-6 gap-6">
            {cartState.map((i: Items)=>{
                return(
                <div className="w-full">
                    <ItemCart
                        id={i.id}
                        name= {i.name}
                        price= {i.price}
                        amount_on_storage= {i.amount_on_storage}
                        description= {i.description}
                        handleRemoveToCart={handleRemoveToCart}
                    />
                </div>
                )
            })}
        </div>
    </div>
  )}
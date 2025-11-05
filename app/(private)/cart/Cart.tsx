'use client'

import { useCart } from "@/app/CartContext";
import ItemCart from "./ItemCart";
import { Items } from "../market/Market";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/AuthContext";

export function Cart() {
  const cart = useCart()
  const[cpf, setCpf] = useState("");
  const [showCpfModal, setShowCpfModal] = useState<boolean>(false);
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

    const showCpfModalFunc = () =>{
        setShowCpfModal(!showCpfModal)
    }

    const finalizarCompra = () =>{
        cart.finalizarCompra(cpf)
    }
  return (
    <div className="flex w-full gap-5 flex-wrap flex-col items-center justify-center bg-gray-300/40 rounded-lg">
            <div>
                <h1 className="text-lg m-6 font-bold">
                    Meu carrinho
                </h1>
                <button onClick={()=>{showCpfModalFunc()}}
                    className="bg-transparent bg-gradient-to-br from-red-500 to-white-500 text-black focus-visible:ring-pink-600/20 cursor-pointer p-2 rounded-lg hover:bg-orange-500 font-semibold">
                    Finalizar compra
                </button>
            </div>
        <div className="w-[60%] m-auto rounded-lg flex items-center justify-center flex-col bg-gray-400/40 p-6 gap-6 mb-5">
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
                        picture={i.picture}
                    />
                </div>
                )
            })}
        </div>
            {
                showCpfModal &&
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                fixed
                text-black
                 w-[101%] h-[101vh] bg-black flex justify-center items-center z-50">
                    <div className="w-[70%] h-[70vh] flex flex-col items-center bg-white rounded-lg">
                        <div className="w-full flex justify-end">
                            <button className="h-[30px] w-[30px] bg-red-500 rounded-lg hover:bg-red-900 cursor-pointer m-5"
                            onClick={()=>{showCpfModalFunc()}}>
                                X
                            </button>
                        </div>
                        <div className="w-full flex justify-center items-center gap-3 my-5 flex-wrap">
                            <label htmlFor="cpf"
                            className="font-bold text-lg">Insira o Cpf:</label>
                            <input 
                            className="w-[60%] p-3 rounded border-2 border-black"
                            type="text" 
                            placeholder="000.000.000-00"
                            name="cpf"
                            id="cpf"
                            onChange={(e)=>{setCpf(e.target.value)}}/>
                            <p className="text-gray-400 font-small w-[100%] text-end pr-[20%]">
                            escreva apenas os numeros de seu cpf
                        </p>
                        </div>
                        <button 
                        onClick={()=>{
                            finalizarCompra()
                            showCpfModalFunc()}}
                        className="
                        w-[30%] mx-auto
                        bg-transparent bg-gradient-to-br from-blue-500 to-white-500 text-black focus-visible:ring-gray-600/20 cursor-pointer p-2 rounded-lg hover:bg-black font-semibold">
                            Enviar
                        </button>
                    </div>
                </div>
            }
    </div>
  )}
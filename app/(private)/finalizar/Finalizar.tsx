'use client'
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"
import ItemFinalizar, { ItemFinalizarType } from "./ItemFinalizar";
import Cookies from 'js-cookie';
import { useAuth } from "@/app/AuthContext";


export default function Finalizar() {
    const [requestFinalizados, setRequestFinalizados] = useState<ItemFinalizarType[]>([]);
    const auth = useAuth()
    useEffect(()=>{
        const value = Cookies.get('token'); 
          if (value) auth.login(value);
          
        (async()=>{
            const sessionDecoded = sessionStorage.getItem("token");
            if(sessionDecoded){
                const session:any = jwtDecode(sessionDecoded);
                const request = await fetch(`http://localhost:3001/compra/${session.sub}`, {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    }
                });
                if(request.ok){
                    const requestJson = await request.json()
                   

                    for(let z of requestJson){
                        // 🔹 1. Contar ocorrências por nome
                        const mp = new Map();
                        for (let item of z.produtos) {
                        mp.set(item.name, (mp.get(item.name) ?? 0) + 1);
                        }

                        // 🔹 2. Criar array de produtos únicos
                        const newProdutosArray: any[] = [];
                        const nomesVistos = new Set();

                        for (let item of z.produtos) {
                        if (!nomesVistos.has(item.name)) {
                            nomesVistos.add(item.name);
                            newProdutosArray.push({
                            ...item,
                            quantidade: mp.get(item.name), // adiciona campo quantidade
                            });
                        }
                        }

                        // 🔹 3. Atualizar JSON final
                        z.produtos = [...newProdutosArray];

                        setRequestFinalizados(requestJson);
                    }
                }
            }
        })()
    },[])
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {  requestFinalizados.map((i:any)=>{
            return(
                <div className="p-5 rounded-lg flex justify-center items-center">
                    <ItemFinalizar
                        {...i}
                        />
                </div>
            )
        })
    }
    </div>
  )
}
//bg-transparent bg-gradient-to-br from-green-400 to-blue-400 text-black focus-visible:ring-green-300/20
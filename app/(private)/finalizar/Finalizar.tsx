'use client'
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"
import ItemFinalizar, { ItemFinalizarType } from "./ItemFinalizar";

export default function Finalizar() {
    const [requestFinalizados, setRequestFinalizados] = useState<ItemFinalizarType[]>([]);
    
    useEffect(()=>{
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
    <div className="w-full flex justify-center p-5">
        {  requestFinalizados.map((i:any)=>{
            return(
                <div className="p-5 bg-gray-600 rounded">
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
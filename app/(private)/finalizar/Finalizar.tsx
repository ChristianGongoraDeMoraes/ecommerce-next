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
                    setRequestFinalizados(requestJson)
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
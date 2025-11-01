"use client"
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { useCart } from "@/app/CartContext";

export type Items = {
    "id": number,
	"name": string,
	"price": number,
	"amount_on_storage": number,
	"description": string
}

export function Market() {
    const [items, setItems] = useState<Items[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const cart = useCart();

  useEffect(() => {
    const fetchItems = async () => {
        // Fetch items from backend
        try{
        const response = await fetch(`http://localhost:3001/products`, {
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          const err = await response.json()
          throw new Error(err.message || "Failed to load items.")
        }

        const data = await response.json()
        setItems(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchItems()
  }, [])
  
  const handleAddCart = (item: Items) =>{
    cart.addToCart(item)
  }

  if (loading) return <p>Loading items...</p>
  if (error) return <p className="text-red-500">{error}</p>


  return (
    <div className="flex w-full gap-5 flex-wrap">
        {items.map((i)=>{
            return(
            <div>
                <ItemCard
                    id={i.id}
                    name= {i.name}
                    price= {i.price}
                    amount_on_storage= {i.amount_on_storage}
                    description= {i.description}
                    handler={handleAddCart}
                />
            </div>
            )
        })}
    </div>
  )}
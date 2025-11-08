import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Items } from "../market/Market"
import { useCart } from "@/app/CartContext"
import { useAuth } from "@/app/AuthContext";
import Cookies from 'js-cookie';

type Produto = {
    id:number,
    name:string,
    price: number,
    amount_on_storage:number,
    description:string,
    picture:string
}
export default function ProdutoPage(){
    const [produto, setProduto] = useState<Produto | null>(null)
    const params = useSearchParams()
    const cart = useCart()
    const auth = useAuth()

    useEffect(()=>{
    const value = Cookies.get('token'); 
          if (value) auth.login(value);

        getItem()
    },[])

    const getItem = async ()=>{
            //get params
            const itemId = params.get("itemId")
            if (itemId){
                const request = await fetch(`http://localhost:3001/products/${itemId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })
                const data = await request.json()
                console.log(data)
                setProduto(data)
            }
        }

    const handleAddToCart = async (item: Items) =>{
        cart.addToCart(item)
    }

    return(
        <div className="w-full flex justify-center items-center 
        bg-gradient-to-tr from-gray-900/40 to-white/40
        rounded-lg">
            {   produto &&
                <div className="w-[90%] min-h-[90vh] flex flex-col justify-center items-center gap-5 p-3">
                    <p className="text-3xl p-5 rounded-lg bg-black/70">{produto.name}</p>

                    <div className="w-[90%] flex justify-center items-center">
                        <img
                            src={`http://localhost:3001/pictures/${produto.picture}`}
                            alt='Banner'
                            className='w-[50%] h-[500px] rounded-lg'
                        />
                        <div className="w-[50%] h-[500px]">
                            <div className="w-full h-full flex flex-col justify-evenly items-center gap-3 text-l font-medium p-3
                            bg-gradient-to-tr from-white/40 to-gray-900/40
                            rounded-lg">
                                <p className="p-5 rounded-lg bg-black/70">Preço : {produto.price} R$</p>
                                <p className="p-5 rounded-lg bg-black/70">Descrição do produto : {produto.description}</p>
                                <p className="p-5 rounded-lg bg-black/70">Estoque atual do produto : {produto.amount_on_storage}</p>
                                <Button className='w-[300px] h-[50px] bg-black text-white m-6 cursor-pointer'
                                    onClick={() => {handleAddToCart({
                                        id: produto.id,
                                        name: produto.name,
                                        price: produto.price,
                                        amount_on_storage: produto.amount_on_storage,
                                        description: produto.description,
                                        picture: produto.picture
                                    })}}>
                                        Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </div>
    )
}
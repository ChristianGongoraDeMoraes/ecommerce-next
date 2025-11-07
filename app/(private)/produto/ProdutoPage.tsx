import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

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

    useEffect(()=>{
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
    return(
        <div className="w-full flex items-center align-center">
            {   produto &&
                <div className="w-[90%] min-h-[90vh] bg-white/40 flex items-center align-center">
                    <img
                        src={`http://localhost:3001/pictures/${produto.picture}`}
                        alt='Banner'
                        className='w-[50%] h-[500px] rounded-lg'
                    />
                    <div className="w-[50%]">
                        <p>{produto.name}</p>
                        <p>{produto.price} R$</p>
                        <p>{produto.description}</p>
                        <p>{produto.amount_on_storage}</p>
                    </div>
                </div>

            }
        </div>
    )
}
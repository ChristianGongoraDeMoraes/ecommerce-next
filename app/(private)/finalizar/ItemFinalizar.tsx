import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Items } from '../market/Market'

export type ItemFinalizarType = {
    "id":number,
    "cpf":string,
    "total_price":number,
    "Pessoa_id":number,
    "produtos":[{
        "id": number,
        "name": string,
        "price": number,
        "amount_on_storage": number,
        "description": string,
        "quantidade":number
    }]
}

const ItemCard = (props: ItemFinalizarType) => {
  return (
    <Card className='w-[90%] min-h-[300px] py-0 flex-col gap-0 font-medium
    bg-gradient-to-r from-blue-900/10 to-green-900/30

    '>
      <div className='w-[100%]'>
        <CardHeader className='pt-3'>
          <CardTitle className='text-lg border-b border-white pb-1 text-white text-center'>Cpf : {props.cpf}</CardTitle>
          <CardDescription className='text-gray font-small text-white text-center'>💰 Total: {props.total_price} R$</CardDescription>
        </CardHeader>
        <CardFooter className='gap-3 py-3 flex flex-wrap'>
          <div  className="w-full flex flex-col p-3 border-gray-200 rounded-xl shadow-sm bg-gray-50 
          bg-transparent">
            <p className='text-center text-white'>Produtos</p>
            <p className='ml-2'>{props.produtos.map((i)=>{
                return(
                <div className='flex flex-col mb-3 p-2 rounded-lg
                border-b border-white pb-1 text-white text-center
                text-white
                hover:bg-white/20'>
                    <p className='font-medium'>{i.name}</p>
                    <p> R$: {i.price}</p>
                    <p> qnt: {i.quantidade} </p>
                </div>
                )})
            }</p>
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}

export default ItemCard

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
    }]
}

const ItemCard = (props: ItemFinalizarType) => {
  return (
    <Card className='w-[200px] h-[300px] py-0 flex-col gap-0'>
      <div className='w-[100%]'>
        <CardHeader className='pt-3'>
          <CardTitle>{props.cpf}</CardTitle>
          <CardDescription className='text-gray font-small'>Total: R${props.total_price}</CardDescription>
        </CardHeader>
        <CardFooter className='gap-3 py-3 flex flex-wrap'>
          <div>
            <p>Produtos:</p>
            <p>{props.produtos.map((i)=>{
                return(
                <div className='flex'>
                    <p>{i.name}</p>
                    <p>. R$:{i.price}</p>
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

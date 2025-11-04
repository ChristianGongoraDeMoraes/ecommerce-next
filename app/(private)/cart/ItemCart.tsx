
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Items } from '../market/Market'

type ItemCart = {
  "id": number,
	"name": string,
	"price": number,
	"amount_on_storage": number,
	"description": string,
  "picture": string,
  handleRemoveToCart:(item: Items)=>void;
}


const ItemCard = (props: ItemCart) => {
  return (
    <Card className='w-full h-[200px] py-0 flex gap-0 flex-row'>
      <CardContent className='grow-1 px-0 m-0'>
        <img
          src={`http://localhost:3001/pictures/${props.picture}`}
          alt='Banner'
          className='w-[300px] h-[200px] rounded-lg'
        />
      </CardContent>
      <div className='w-[100%] flex flex-col justify-between'>
        <CardHeader className='pt-3 flex flex-col justify-between'>
          <CardTitle >{props.name}</CardTitle>
          <CardDescription >{props.description}</CardDescription>
          <CardDescription className='text-black font-medium'>R$: {props.price}</CardDescription>
        </CardHeader>
        <CardFooter className='gap-3 py-3 flex flex-wrap justify-end'>
          <Button 
          onClick={()=>{props.handleRemoveToCart({
            id: props.id,
            name: props.name,
            price: props.price,
            amount_on_storage: props.amount_on_storage,
            description: props.description,
            picture: props.picture
          })}}
          className='mr-[10px] bg-transparent bg-gradient-to-br from-red-500 to-white-500 text-white focus-visible:ring-pink-600/20'>
            Remove
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}

export default ItemCard

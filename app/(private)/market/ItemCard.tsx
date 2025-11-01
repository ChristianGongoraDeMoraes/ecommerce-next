import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Items } from '../market/Market'

type ItemCard = {
  "id": number,
	"name": string,
	"price": number,
	"amount_on_storage": number,
	"description": string,
  handler:(item: Items)=>void;
}

const ItemCard = (props: ItemCard) => {
  return (
    <Card className='w-[200px] h-[300px] py-0 flex-col gap-0'>
      <CardContent className='grow-1 px-0 m-0'>
        <img
          src='https://cdn.shadcnstudio.com/ss-assets/components/card/image-3.png'
          alt='Banner'
          className='w-full h-[100px] rounded-lg'
        />
      </CardContent>
      <div className='w-[100%]'>
        <CardHeader className='pt-3'>
          <CardTitle>{props.name}</CardTitle>
          <CardDescription className='text-gray font-small'>{props.description}</CardDescription>
          <CardDescription className='text-black font-medium'>{props.price}</CardDescription>
        </CardHeader>
        <CardFooter className='gap-3 py-3 flex flex-wrap'>
          <Button className='bg-transparent bg-gradient-to-br from-purple-500 to-pink-500 text-white focus-visible:ring-pink-600/20'>
            Explore More
          </Button>
          <Button className='w-[100px] bg-black text-white focus-visible:ring-pink-600/20'
          onClick={() => {props.handler({
            id: props.id,
            name: props.name,
            price: props.price,
            amount_on_storage: props.amount_on_storage,
            description: props.description,
          })}}>
            Add to Cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}

export default ItemCard

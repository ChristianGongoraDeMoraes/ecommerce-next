import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Items } from '../market/Market'
import { useRouter } from 'next/navigation'

type ItemCard = {
  "id": number,
	"name": string,
	"price": number,
	"amount_on_storage": number,
	"description": string,
  "picture": string
  handler:(item: Items)=>void;
}

const ItemCard = (props: ItemCard) => {
  const router = useRouter()
  return (
    <Card className='w-[200px] min-h-[300px] py-0 flex-col gap-0'>
      <CardContent className='grow-1 px-0 m-0'>
        <img
          src={`http://localhost:3001/pictures/${props.picture}`}
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
          <Button className='bg-transparent bg-gradient-to-br from-purple-500 to-pink-500 text-white focus-visible:ring-pink-600/20'
          onClick={()=>{
            router.push(`/produto?itemId=${props.id}`)
          }}>
            Explore More
          </Button>
          <Button className='w-[100px] bg-black text-white focus-visible:ring-pink-600/20 cursor-pointer'
          onClick={() => {props.handler({
            id: props.id,
            name: props.name,
            price: props.price,
            amount_on_storage: props.amount_on_storage,
            description: props.description,
            picture: props.picture
          })}}>
            Add to Cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}

export default ItemCard

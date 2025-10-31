import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const ItemCard = () => {
  return (
    <Card className='w-full h-[200px] py-0 flex gap-0 flex-row'>
      <CardContent className='grow-1 px-0 m-0'>
        <img
          src='https://cdn.shadcnstudio.com/ss-assets/components/card/image-3.png'
          alt='Banner'
          className='w-[300px] h-[200px] rounded-lg'
        />
      </CardContent>
      <div className='w-[100%]'>
        <CardHeader className='pt-3'>
          <CardTitle>Dreamy Colorwave Gradient</CardTitle>
          <CardDescription >Dreamy Colorwave GradientDreamy Colorwave GradientDreamy Colorwave GradientDreamy Colorwave Gradient</CardDescription>
          <CardDescription className='text-black font-medium'>R$: 10,00</CardDescription>
        </CardHeader>
        <CardFooter className='gap-3 py-3 flex flex-wrap'>
          <Button className='bg-transparent bg-gradient-to-br from-red-500 to-white-500 text-white focus-visible:ring-pink-600/20'>
            Remove
          </Button>
          <Button className='w-[100px] bg-black text-white focus-visible:ring-pink-600/20'>
            Add to Cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}

export default ItemCard

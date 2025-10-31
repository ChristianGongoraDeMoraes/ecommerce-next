
import ItemCart from "./ItemCart";


export function Cart() {
    const items = ['1', '2', '3']

  return (
    <div className="flex w-full gap-5 flex-wrap flex-col items-center justify-center bg-gray-300/40 rounded-lg">
            <div>
                <h1 className="text-lg m-6 font-bold">
                    Meu carrinho
                </h1>
            </div>
        <div className="w-[60%] m-auto rounded-lg flex items-center justify-center flex-col bg-gray-400/40 p-6 gap-6">
            {items.map((i)=>{
                return(
                <div className="w-full">
                    <ItemCart/>
                </div>
                )
            })}
        </div>
    </div>
  )}
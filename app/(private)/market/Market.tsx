import ItemCard from "./ItemCard";


export function Market() {
    const items = ['1', '2', '3']

  return (
    <div className="flex w-full gap-5 flex-wrap">
        {items.map((i)=>{
            return(
            <div>
                <ItemCard/>
            </div>
            )
        })}
    </div>
  )}
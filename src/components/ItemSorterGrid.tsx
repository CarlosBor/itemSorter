

const ItemSorterGrid = ({ items, filter }) =>{
    console.log(filter);
    const filteredItems = items.filter((item)=>{
        return Object.keys(filter).every((key)=>{
            return filter[key].includes(item[key]);
        })
    })

    return(
        filteredItems.map((item)=>{
            const keys = Object.keys(item);
            return(
                <div>
                    {keys.map((key)=>{
                        return <p>{key} : {item[key]}</p>
                    })}
                </div>
            )
        })
    )
}

export default ItemSorterGrid;
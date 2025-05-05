import style from './ItemSorterGrid.module.css';

const ItemSorterGrid = ({ items, filter }) =>{
    const filteredItems = items.filter((item)=>{
        return Object.keys(filter).every((key)=>{
            return filter[key].includes(item[key]);
        })
    })

    return (
        <div className={style.itemGrid}>
          {filteredItems.map((item, index) => {
            const keys = Object.keys(item);
            return (
              <div key={`item-${index}`}>
                {keys.map((key) => (
                  <p key={key}>{key} : {item[key]}</p>
                ))}
              </div>
            );
          })}
        </div>
      );
      
}

export default ItemSorterGrid;
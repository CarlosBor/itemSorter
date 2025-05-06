import style from './ItemSorterGrid.module.css';

const ItemSorterGrid = ({ items, filter }) =>{

  const filteredItems = items.filter((item) => {
    return Object.keys(filter).every((key) => {
      const criterion = filter[key];

      if (Array.isArray(criterion) && criterion.length === 2 && typeof criterion[0] === "number") {
        const [min, max] = criterion;
        return item[key] >= min && item[key] <= max;
      }

      return Array.isArray(criterion) && criterion.includes(item[key]+"");
    });
  });

    return (
        <div className={style.itemGrid}>
          {filteredItems.map((item, index) => {
            const keys = Object.keys(item);
            return (
              <div className={style.itemCard} key={`item-${index}`}>
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
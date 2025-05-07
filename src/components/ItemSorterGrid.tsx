import style from './ItemSorterGrid.module.css';
import capitalizeFirstLetter from '../utils/capitalizeFirst';
interface ItemSorterGridProps {
  items: Record<string, any>[];
  filter: Record<string, any>;
  gridClassName: string;
  cardClassName: string;
  datapointClassName: string;
}
const ItemSorterGrid: React.FC<ItemSorterGridProps> =
 ({ items,
   filter,
   gridClassName="",
   cardClassName="",
   datapointClassName=""
  }) => {
  let filteredItems = items.filter((item) => {
    return Object.keys(filter).every((key) => {
      if (key === "search") return true;
      const criterion = filter[key];
      if (Array.isArray(criterion) && criterion.length === 2 && typeof criterion[0] === "number") {
        const [min, max] = criterion;
        return item[key] >= min && item[key] <= max;
      }
      return Array.isArray(criterion) && criterion.includes(item[key]+"");
    });
  });

  if (filter["search"]) {
    const searchTerm = filter["search"].toLowerCase();
    console.log(searchTerm);
    filteredItems = filteredItems.filter((item) => {
      return Object.values(item).some((value) => {
        return typeof value === "string" && value.toLowerCase().includes(searchTerm);  // <-- Added return statement here
      });
    });
  }

    return (
        <div className={`${style.itemGrid} ${gridClassName}`}>
          {filteredItems.map((item, index:number) => {
            const keys = Object.keys(item);
            return (
              <div className={`${style.itemCard} ${cardClassName}`} key={`item-${index}`}>
                {keys.map((key) => (
                  <p className={datapointClassName} key={key}> {capitalizeFirstLetter(key)} : {item[key]}</p>
                ))}
              </div>
            );
          })}
        </div>
      );
      
}

export default ItemSorterGrid;
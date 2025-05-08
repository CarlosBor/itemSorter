import style from './ItemSorterGrid.module.css';
import capitalizeFirstLetter from '../utils/capitalizeFirst';
import renderBool from '../utils/renderBool';
interface ItemSorterGridProps {
  items: Record<string, any>[];
  filter: Record<string, any>;
  parseOutput?: Record<string, Function>;
  gridClassName?: string;
  cardClassName?: string;
  datapointClassName?: string;
  imageUrl?:string;
  cardFunction?:Function;
}
const ItemSorterGrid: React.FC<ItemSorterGridProps> =
 ({ items,
   filter,
   gridClassName="",
   cardClassName="",
   datapointClassName="",
   imageUrl="",
   parseOutput  = {},
   cardFunction=null
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
    filteredItems = filteredItems.filter((item) => {
      return Object.values(item).some((value) => {
        return typeof value === "string" && value.toLowerCase().includes(searchTerm);
      });
    });
  }

    return (
        <div className={`${style.itemGrid} ${gridClassName}`}>
          {filteredItems.map((item, index:number) => {
            const keys = Object.keys(item);
            return (
              <div onClick={cardFunction && (() => cardFunction(item))} className={`${style.itemCard} ${cardClassName}`} key={`item-${index}`}>
                {keys.includes(imageUrl) && <img className="grid-thumbnail" src={item[imageUrl]} alt="" />}
                {keys.filter(key => key !== imageUrl).map((key) => (
                  <p className={datapointClassName} key={key}>
                     <span>{capitalizeFirstLetter(key)}: </span> 
                     <span>{parseOutput[key] ? parseOutput[key](renderBool(item[key])) : renderBool(item[key])}</span>
                  </p>
                ))}
              </div>
            );
          })}
        </div>
      );
}

export default ItemSorterGrid;
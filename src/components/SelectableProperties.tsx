
interface SelectablePropertiesProps {
  items: Record<string, any>[];
  property: string;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortFunction?: (a: any, b: any) => number;
  checkboxClassName: string;
}

const SelectableProperties:React.FC<SelectablePropertiesProps> = 
({ items,
   property,
   onCheckboxChange,
   sortFunction,
   checkboxClassName }) => {
  const propertiesArray = [...new Set(items.map((item) => item[property]))];
  if(sortFunction!=null){
    propertiesArray.sort(sortFunction);
  }

  return (
    propertiesArray.map((value, index) => {
      return (
        <label key={`label-${index}`} className={checkboxClassName}>
          <input
            type="checkbox"
            name={value}
            value={value}
            onChange={onCheckboxChange} 
          />
          <span>{value}</span>
        </label>
      );
    })
  );
}

export default SelectableProperties;

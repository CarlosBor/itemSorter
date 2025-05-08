import renderBool from "../../utils/renderBool";
import styles from './SelectableProperties.module.css';

interface SelectablePropertiesProps {
  items: Record<string, any>[];
  property: string;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortFunction?: (a: any, b: any) => number;
  checkboxClassName: string;
  parseOutput?: Record<string, Function>;
}

const SelectableProperties:React.FC<SelectablePropertiesProps> = 
({ items,
   property,
   onCheckboxChange,
   sortFunction,
   checkboxClassName,
   parseOutput = {} }) => {
  const propertiesArray = [...new Set(items.map((item) => item[property]))];
  if(sortFunction!=null){
    propertiesArray.sort(sortFunction);
  }

  return (
    propertiesArray.map((value, index) => {
      return (
        <label key={`label-${index}`} className={checkboxClassName || styles.checkbox}>
          <input
            type="checkbox"
            name={value}
            value={value}
            onChange={onCheckboxChange} 
          />
          <span>
            {parseOutput[property] ? parseOutput[property](renderBool(value)) : renderBool(value)}
          </span>
        </label>
      );
    })
  );
}

export default SelectableProperties;

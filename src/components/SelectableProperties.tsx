import react from 'react';

const SelectableProperties = ({ items, property, onCheckboxChange }) => {
  const propertiesArray = [...new Set(items.map((item) => item[property]))];

  return (
    propertiesArray.map((value, index) => {
      return (
        <label key={`label-${index}`}>
          <input
            type="checkbox"
            name={value}
            value={value}
            onChange={onCheckboxChange} 
          />
          {value}
        </label>
      );
    })
  );
}

export default SelectableProperties;

import react from 'react';

const SelectableProperties = ({ items, property, onCheckboxChange }) => {
  // Extract unique values for the property (size, color, etc.)
  const propertiesArray = [...new Set(items.map((item) => item[property]))];

  return (
    propertiesArray.map((value, index) => {
      return (
        <label key={`label-${index}`}>
          <input
            type="checkbox"
            name={value}
            value={value} // The value of the checkbox (e.g., "S", "M", "Blue")
            onChange={onCheckboxChange}  // Calls the handler passed from the parent
          />
          {value}
        </label>
      );
    })
  );
}

export default SelectableProperties;

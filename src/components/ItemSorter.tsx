import SelectableProperties from './SelectableProperties';
import ItemSorterGrid from './ItemSorterGrid';
import { useReducer } from 'react';
import capitalizeFirstLetter from '../utils/capitalizeFirst';
import style from './ItemSorter.module.css';
import { Range } from "react-range";

const initialState = {};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD': {
      const { property, value, itemValue } = action;
      const updatedState = { ...state };

      if (Array.isArray(itemValue)) {
        // For range filters, store the range array
        updatedState[property] = itemValue;
      } else {
        // For checkbox-style filters, store the selected values
        if (value) {
          if (!updatedState[property]) {
            updatedState[property] = [];
          }
          if (!updatedState[property].includes(itemValue)) {
            updatedState[property].push(itemValue);
          }
        } else {
          if (updatedState[property]) {
            updatedState[property] = updatedState[property].filter(
              (item) => item !== itemValue
            );
            if (updatedState[property].length === 0) {
              delete updatedState[property];
            }
          }
        }
      }
      return updatedState;
    }
    default:
      return state;
  }
}

const ItemSorter = ({ items, rangeFields = []}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCheckboxChange = (field) => (e) => {
    dispatch({
      type: 'SET_FIELD',
      property: field,
      value: e.target.checked,
      itemValue: e.target.value,
    });
  };

  return (
    <>
      <div className={style.sidebar}>
        <h3>Sidebar</h3>
        {Object.keys(items[0]).map((key, index) => {
          return (
            <div key={`section-${index}`}>
              <h4>{capitalizeFirstLetter(key)}</h4>
              {(() => {
                if (rangeFields.includes(key)) {
                  const minValue = Math.min(...items.map((item) => item[key]));
                  const maxValue = Math.max(...items.map((item) => item[key]));
                  return (
                    <Range
                      values={state[key] || [minValue, maxValue]}
                      step={1}
                      min={minValue}
                      max={maxValue}
                      onChange={(values) => {
                        dispatch({
                          type: 'SET_FIELD',
                          property: key,
                          value: true,
                          itemValue: values,
                        });
                      }}
                      renderTrack={({ props, children }) => (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            height: "6px",
                            width: "100%",
                            backgroundColor: "#ccc",
                          }}
                        >
                          {children}
                        </div>
                      )}
                      renderThumb={({ props, value }) => (
                        <div
                          {...props}
                          key={props.key}
                          style={{
                            ...props.style,
                            height: "42px",
                            width: "42px",
                            backgroundColor: "#999",
                          }}
                        >
                          <span>{value}</span>  
                        </div>
                      )}
                    />
                  );
                }

                return (
                  <SelectableProperties
                    key={`selectable-${index}`}
                    items={items}
                    property={key}
                    onCheckboxChange={handleCheckboxChange(key)}
                  />
                );
              })()}
            </div>
          );
        })}
      </div>
      <ItemSorterGrid items={items} filter={state} />
    </>
  );
}

export default ItemSorter;

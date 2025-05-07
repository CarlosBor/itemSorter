import SelectableProperties from './SelectableProperties';
import ItemSorterGrid from './ItemSorterGrid';
import { useReducer } from 'react';
import capitalizeFirstLetter from '../utils/capitalizeFirst';
import style from './ItemSorter.module.css';
import { Range } from "react-range";

const initialState: FilterState = {};

interface FilterState {
  [key: string]: string[] | number[] | string;
}

type ItemList = Record<string, any>[];
interface ItemSorterProps {
  items: ItemList;
  rangeFields?: string[];
  orderFields?: Record<string, Function>;
  explicitFields?: string[];
  textSearch?: boolean;
}

type Action =
  | { type: "SET_FIELD"; property: string; value: boolean; itemValue: string }
  | { type: "SET_FIELD"; property: string; value: boolean; itemValue: number[] }
  | { type: "SET_SEARCH"; query: string };

function reducer(state: FilterState, action: Action) {
  switch (action.type) {
    case 'SET_FIELD': {
      const { property, value, itemValue } = action;
      const updatedState = { ...state };

      if (Array.isArray(itemValue)) {
        updatedState[property] = itemValue;
      } else if (typeof itemValue === "string") {
        if (value) {
          if (!updatedState[property]) {
            updatedState[property] = [];
          }
          if (!(updatedState[property] as string[]).includes(itemValue)) {
            (updatedState[property] as string[]).push(itemValue);
          }
        } else {
          if (updatedState[property]) {
            updatedState[property] = (updatedState[property] as string[]).filter(
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
    case 'SET_SEARCH': {
      const { query } = action;
      const updatedState = { ...state };
      updatedState['search'] = query;
      if (query === "") {
        delete updatedState['search'];
      }
      return updatedState;
    }
    default:
      return state;
  }
}


const ItemSorter: React.FC<ItemSorterProps> = 
({ items,
   rangeFields = [],
   orderFields = [],
   explicitFields = null,
   textSearch=false}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  if(explicitFields != null){
    items = items.map((item) => {
        Object.keys(item).forEach((key)=>{
          if(explicitFields.indexOf(key)==-1){
            delete item[key];
          }
        })
      return item;
    })
  }

  const handleCheckboxChange = (field:string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_FIELD',
      property: field, //Such as size
      value: e.target.checked, //True or false
      itemValue: e.target.value, //XS, S, M, L, XL
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_SEARCH',
      query: e.target.value, //True or false
    });
  };

  return (
    <>
      <div className={style.sidebar}>
        <h3>Sidebar</h3>
        {textSearch && <input onChange={handleSearchChange} placeholder="Search..."/>}
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
                      values={state[key] as number[] || [minValue, maxValue]}
                      step={1}
                      min={minValue}
                      max={maxValue}
                      onChange={(values) => {
                        dispatch({
                          type: 'SET_FIELD',
                          property: key, //Such as price
                          value: true,
                          itemValue: values, //Array of min and max
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
                    // @ts-ignore
                    sortFunction={orderFields[key] || null}
                  />
                );
              })()}
            </div>
          );
        })}
      </div>
      <ItemSorterGrid
        items={items}
        filter={state}
      />
    </>
  );
}

export default ItemSorter;

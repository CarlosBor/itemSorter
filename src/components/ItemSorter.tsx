import SelectableProperties from './SelectableProperties';
import ItemSorterGrid from './ItemSorterGrid';
import { useReducer } from 'react';
import capitalizeFirstLetter from '../utils/capitalizeFirst';
import { Range } from "react-range";
import styles from './ItemSorter.module.css';

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
  imageUrl?: string;
  parseOutput?: Record<string, Function>;
  className?: string;
  cardFunction?: Function;
  sidebarClassName?: string;
  containerClassName?: string;
  sectionClassName?: string;
  inputClassName?: string;
  gridClassName?: string;
  cardClassName?: string;
  datapointClassName?: string;
  checkboxClassName?: string;
  gridThumbnailClassName?: string;
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
   textSearch = false,
   imageUrl = "",
   cardFunction = null,
   parseOutput = {},
   containerClassName = "",
   sidebarClassName = "",
   sectionClassName = "",
   inputClassName = "",
   gridClassName = "",
   cardClassName = "",
   datapointClassName = "",
   checkboxClassName = "",
   gridThumbnailClassName = "",
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  if(explicitFields != null){
    items = items.map((item) => {
        Object.keys(item).forEach((key)=>{
          if(explicitFields.indexOf(key) == -1){
            delete item[key];
          }
        })
      return item;
    });
  }

  const handleCheckboxChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_FIELD',
      property: field,
      value: e.target.checked,
      itemValue: e.target.value,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_SEARCH',
      query: e.target.value,
    });
  };

  return (
    <div className={`${containerClassName || styles.container}`}>
      <div className={`${sidebarClassName || styles.sidebar}`}>
        <h3>Filters</h3>
        {textSearch && (
          <input
            onChange={handleSearchChange}
            placeholder="Search..."
            className={`${inputClassName || styles.searchInput}`}
          />)}
        {Object.keys(items[0]).map((key, index) => {
          if(imageUrl==key){
            return;
          }
          return (
            <div key={`section-${index}`} className={`${sectionClassName || styles.sectionClassName}`}>
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
                            width: "90%",
                            margin: "auto",
                            backgroundColor: "#ccc",
                          }}
                        >
                          {children}
                        </div>
                      )}
                      renderThumb={({ props, value }) => (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            height: "42px",
                            width: "42px",
                            backgroundColor: "#999",
                            borderRadius: "30px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
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
                    //@ts-ignore
                    sortFunction={orderFields[key] || null}
                    parseOutput={parseOutput}
                    checkboxClassName={checkboxClassName}
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
        imageUrl={imageUrl}
        parseOutput={parseOutput}
        cardFunction={cardFunction}
        gridClassName={gridClassName}
        cardClassName={cardClassName}
        datapointClassName={datapointClassName}
        gridThumbnailClassName={gridThumbnailClassName}
      />
    </div>
  );
};

export default ItemSorter;

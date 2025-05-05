import react from 'react';
import SelectableProperties from './SelectableProperties';
import ItemSorterGrid from './ItemSorterGrid';
import { useReducer } from 'react';

const initialState = {};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      const { property, value, itemValue } = action;
      const updatedState = { ...state };

      if (value) {
        if (!updatedState[property]) {
          updatedState[property] = [];
        }
        if (!updatedState[property].includes(itemValue)) {
          updatedState[property].push(itemValue);
        }
      } else {
        updatedState[property] = updatedState[property].filter(
          (item) => item !== itemValue
        );
      }

      return updatedState;

    default:
      return state;
  }
}

const ItemSorter = (props) => {
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
        {Object.keys(props.items[0]).map((key, index) => {
        return (
            <>
            <h4 key={`header-${index}`}>{key}</h4>
            <SelectableProperties
                key={`selectable-${index}`}
                items={props.items}
                property={key}
                onCheckboxChange={handleCheckboxChange(key)}
            />
            </>
        );
        })
        }
        <ItemSorterGrid />
    </>);
}

export default ItemSorter;

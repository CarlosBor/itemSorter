## Itemsorter
React component to display and filter object arrays

# Usage
Install it by running `npm install itemsorterr --save`. Then to use it:

```jsx
import { ItemSorter } from 'itemsorter';
```


## Examples
### Simple display

Given an object like so:

```
const mockPlants = [
    { species: "Fiddle Leaf Fig", height: 150, indoor: true, price: 49.99, careLevel: "Moderate" },
    { species: "Snake Plant", height: 80, indoor: true, price: 24.99, careLevel: "Low" },
    { species: "Monstera", height: 120, indoor: true, price: 59.99, careLevel: "Easy" },
    { species: "Peace Lily", height: 90, indoor: true, price: 29.99, careLevel: "Moderate" },
    { species: "Spider Plant", height: 40, indoor: true, price: 14.99, careLevel: "Low" },
    { species: "Aloe Vera", height: 50, indoor: true, price: 19.99, careLevel: "Easy" },
    { species: "Cactus", height: 30, indoor: false, price: 12.99, careLevel: "Low" },
    { species: "Bamboo Palm", height: 180, indoor: true, price: 69.99, careLevel: "Moderate" },
    { species: "Rubber Plant", height: 160, indoor: true, price: 39.99, careLevel: "Moderate" },
    { species: "ZZ Plant", height: 100, indoor: true, price: 34.99, careLevel: "Low" },
    { species: "Golden Pothos", height: 60, indoor: true, price: 15.99, careLevel: "Easy" }
];
```

The most simple usage is:
```jsx
<ItemSorter items={mockPlants}/>
```
Which would load the component with default behavior and css like so:
(example1)

### Optional Parameters

The component offers a variety of optional parameters:

#### rangeFields
An array of strings which must be the keys of numerical values, like so:
```jsx
rangeFields={["price", "height"]}
```
Makes it so rather than toggles, the filter displays a range selector, like so:
(example2)

#### orderFields
An object of key:function pairs that can order the fields of the objects, like so:
```jsx
  const orderFunction = (a:string, b:string) =>{
    const sizeOrder = ["XS", "S", "M", "L", "XL"];
    if(sizeOrder.indexOf(a) < sizeOrder.indexOf(b)){
      return -1;
    }else if (sizeOrder.indexOf(b) < sizeOrder.indexOf(a)){
      return 1;
    }else{
      return 0;
    }
  }
orderFields={{"size" : orderFunction}}
```
The values will be sorted in the filter like so:

#### explicitFields
An array of strings, referring to different attributes of the object
```jsx
explicitFields = {["size", "price", "brand", "imgUrl"]}
```
The fields not in the array will be ignored for both the grid and the filter

#### imageUrl
A string which ought to be a url field in the object, to be shown at the top of the cards in the grid:
```jsx
imageUrl = "imgUrl"
```
Will proceed to display as so:
(example4)

#### textSearch
Boolean, will enable a search field at the top of the filter that triggers on every property of each object:
```jsx
textSearch = {true}
```

#### parseOutput
An object of key:function pairs that will parse every entry of the key name through the function associated for example:
```jsx
const addEuro = (price:number) =>{
    return price + "€";
}

parseOutput = {{"price" : addEuro}}
```
Would add a € after the content of every "price" field

#### cardFunction
A function to be fired on click evvent forr cards in the grid. Takes as argument the item itself:
```jsx
const cardFunction = (item : any) => {
    console.log(item);
}
cardFunction = {cardFunction}
```
Would log the contents of the item in the console.

### Styling
The component exposes a variety of CSS classes to the developer, which can be easily overriden:
```jsx
sidebarClassName="sorter-custom-sidebar"
containerClassName="sorter-custom-container"
sectionClassName="sorter-custom-section"
inputClassName="sorter-custom-input"
gridClassName="sorter-custom-grid"
cardClassName="sorter-custom-card"
datapointClassName="sorter-custom-datapoint"
checkboxClassName="sorter-custom-checkbox"
gridThumbnailClassName="sorter-custom-grid-thumbnail"
```
The presence of any of these will assign that class to the node and override the default css styling for it.
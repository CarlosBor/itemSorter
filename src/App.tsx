import ItemSorter from './components/ItemSorter';

function App() {
    const mockData = [
    { "size": "M", "color": "Blue", "brand": "Uniqlo", "price": 19.99, "style": "Casual" },
    { "size": "L", "color": "Black", "brand": "H&M", "price": 24.50, "style": "Formal" },
    { "size": "S", "color": "White", "brand": "Zara", "price": 29.99, "style": "Streetwear" },
    { "size": "XL", "color": "Red", "brand": "Nike", "price": 34.95, "style": "Sport" },
    { "size": "M", "color": "Green", "brand": "Adidas", "price": 27.49, "style": "Athleisure" },
    { "size": "L", "color": "Gray", "brand": "Levi's", "price": 31.00, "style": "Denim" },
    { "size": "S", "color": "Yellow", "brand": "Gap", "price": 22.99, "style": "Casual" },
    { "size": "XL", "color": "Navy", "brand": "Puma", "price": 28.75, "style": "Sport" },
    { "size": "M", "color": "Pink", "brand": "Forever 21", "price": 18.00, "style": "Trendy" },
    { "size": "L", "color": "Brown", "brand": "Old Navy", "price": 20.49, "style": "Basic" }
  ]
  const orderFunction = ( ) =>{
    return "whew";
  }

  return (
    <>
      <ItemSorter 
      items={mockData}
      rangeFields={["price"]}
      // orderFields={[{field:"price", order:orderFunction}]}
      />
    </>
  )
}

export default App

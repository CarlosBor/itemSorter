import ItemSorter from './components/ItemSorter';
import "./styles.css";

function App() {
    const mockData = [
    { "size": "M", "color": "Blue", "brand": "Uniqlo", "price": 19.99, "style": "Casual", "imgUrl": "https://picsum.photos/200/300?random=1" },
    { "size": "L", "color": "Black", "brand": "H&M", "price": 24.50, "style": "Formal", "imgUrl": "https://picsum.photos/200/300?random=2" },
    { "size": "S", "color": "White", "brand": "Zara", "price": 29.99, "style": "Streetwear", "imgUrl": "https://picsum.photos/200/300?random=3" },
    { "size": "XL", "color": "Red", "brand": "Nike", "price": 34.95, "style": "Sport", "imgUrl": "https://picsum.photos/200/300?random=4" },
    { "size": "M", "color": "Green", "brand": "Adidas", "price": 27.49, "style": "Athleisure", "imgUrl": "https://picsum.photos/200/300?random=5" },
    { "size": "L", "color": "Gray", "brand": "Levi's", "price": 31.00, "style": "Denim", "imgUrl": "https://picsum.photos/200/300?random=6" },
    { "size": "S", "color": "Yellow", "brand": "Gap", "price": 22.99, "style": "Casual", "imgUrl": "https://picsum.photos/200/300?random=7" },
    { "size": "XL", "color": "Navy", "brand": "Puma", "price": 28.75, "style": "Sport", "imgUrl": "https://picsum.photos/200/300?random=8" },
    { "size": "M", "color": "Pink", "brand": "Forever 21", "price": 18.00, "style": "Trendy", "imgUrl": "https://picsum.photos/200/300?random=9" },
    { "size": "L", "color": "Brown", "brand": "Old Navy", "price": 20.49, "style": "Basic", "imgUrl": "https://picsum.photos/200/300?random=10" }
  ]

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
  
  const mockPhones = [
    { model: "iPhone 14", brand: "Apple", storage: 256, price: 999.99, OS: "iOS" },
    { model: "Galaxy S23", brand: "Samsung", storage: 512, price: 899.99, OS: "Android" },
    { model: "Pixel 8", brand: "Google", storage: 128, price: 799.99, OS: "Android" },
    { model: "Xperia 5", brand: "Sony", storage: 256, price: 849.99, OS: "Android" },
    { model: "OnePlus 11", brand: "OnePlus", storage: 512, price: 729.99, OS: "Android" },
    { model: "Moto Edge 40", brand: "Motorola", storage: 128, price: 599.99, OS: "Android" },
    { model: "Nothing Phone 2", brand: "Nothing", storage: 256, price: 649.99, OS: "Android" },
    { model: "Galaxy Z Flip 5", brand: "Samsung", storage: 256, price: 1049.99, OS: "Android" },
    { model: "iPhone SE 3", brand: "Apple", storage: 64, price: 429.99, OS: "iOS" },
    { model: "Pixel Fold", brand: "Google", storage: 512, price: 1799.99, OS: "Android" },
    { model: "Asus ROG Phone 7", brand: "Asus", storage: 1024, price: 1299.99, OS: "Android" }
  ];
  
  const mockSongs = [
    { title: "Blinding Lights", artist: "The Weeknd", duration: 200, genre: "Pop", releaseYear: 2019 },
    { title: "Shape of You", artist: "Ed Sheeran", duration: 233, genre: "Pop", releaseYear: 2017 },
    { title: "Bad Guy", artist: "Billie Eilish", duration: 194, genre: "Electropop", releaseYear: 2019 },
    { title: "Old Town Road", artist: "Lil Nas X", duration: 157, genre: "Country Rap", releaseYear: 2019 },
    { title: "Levitating", artist: "Dua Lipa", duration: 203, genre: "Disco Pop", releaseYear: 2020 },
    { title: "Watermelon Sugar", artist: "Harry Styles", duration: 174, genre: "Pop Rock", releaseYear: 2019 },
    { title: "Circles", artist: "Post Malone", duration: 215, genre: "Pop Rock", releaseYear: 2019 },
    { title: "Dance Monkey", artist: "Tones and I", duration: 210, genre: "Electropop", releaseYear: 2019 },
    { title: "Rolling in the Deep", artist: "Adele", duration: 228, genre: "Soul", releaseYear: 2010 },
    { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", duration: 269, genre: "Funk Pop", releaseYear: 2014 },
    { title: "Stay", artist: "The Kid LAROI, Justin Bieber", duration: 141, genre: "Pop", releaseYear: 2021 }
  ];
  
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

  return (
    <>
      <ItemSorter 
        items={mockData}
        // rangeFields={["price"]}
        // orderFields={{"size" : orderFunction}}
        // explicitFields = {["size", "price", "brand"]}
        // textSearch = {true}
        imageUrl = "imgUrl"
        className="sorter-custom-container"
        sidebarClassName="sorter-custom-sidebar"
        sectionClassName="sorter-custom-section"
        inputClassName="sorter-custom-input"
        gridClassName="sorter-custom-grid"
        cardClassName="sorter-custom-card"
        datapointClassName="sorter-custom-datapoint"
        checkboxClassName="sorter-custom-checkbox"
      />
    </>
  )
}

export default App

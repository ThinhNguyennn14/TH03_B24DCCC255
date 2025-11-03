import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import Navbar from "./components/Navbar";
import ProductDetail from "./components/ProductDetail";
import { ProductProvider } from "./components/ProductContext";

export type { Product, Category } from "./components/ProductContext";

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;


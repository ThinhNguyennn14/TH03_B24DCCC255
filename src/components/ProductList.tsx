import { useState, useMemo } from "react";
import { useProducts, Category } from "./ProductContext";
import ProductCard from "./ProductCard";

const ITEMS_PER_PAGE = 6;

const ProductList = () => {
  const { state } = useProducts();
  const { products } = state;

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<Category | "Tất cả">(
    "Tất cả"
  );
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let tempProducts = products;

    if (searchTerm) {
      tempProducts = tempProducts.filter((p) =>
        p.ten.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== "Tất cả") {
      tempProducts = tempProducts.filter((p) => p.danhMuc === filterCategory);
    }

    if (minPrice) {
      tempProducts = tempProducts.filter((p) => p.gia >= Number(minPrice));
    }

    if (maxPrice) {
      tempProducts = tempProducts.filter((p) => p.gia <= Number(maxPrice));
    }

    return tempProducts;
  }, [products, searchTerm, filterCategory, minPrice, maxPrice]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>

      <div>
        <input
          type="text"
          placeholder="Tìm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <label>Lọc theo danh mục: </label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value as any)}
        >
          <option value="Tất cả">Tất cả</option>
          <option value="Điện tử">Điện tử</option>
          <option value="Quần áo">Quần áo</option>
          <option value="Đồ ăn">Đồ ăn</option>
          <option value="Sách">Sách</option>
          <option value="Khác">Khác</option>
        </select>
      </div>

      <div>
        <label>Lọc theo giá: </label>
        <input
          type="number"
          placeholder="Giá từ (min)"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Giá đến (max)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <p>
        Hiển thị {paginatedProducts.length} trên tổng số {filteredProducts.length}{" "}
        sản phẩm
      </p>

      <div>
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Trang {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;


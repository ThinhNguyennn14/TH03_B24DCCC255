import { Link } from "react-router-dom";
import { Product, useProducts } from "./ProductContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;
  const { dispatch } = useProducts();

  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc muốn xóa sản phẩm "${product.ten}"?`)) {
      dispatch({ type: "DELETE_PRODUCT", payload: product.id });
    }
  };

  return (
    <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
      <h3>{product.ten}</h3>
      <p>Danh mục: {product.danhMuc}</p>
      <p>Giá: {product.gia} VNĐ</p>
      <p>Số lượng: {product.soLuong}</p>
      <div>
        <Link to={`/products/${product.id}`}>
          <button>Xem chi tiết</button>
        </Link>
        <Link to={`/edit/${product.id}`}>
          <button>Sửa</button>
        </Link>
        <button onClick={handleDelete}>
          Xóa
        </button>
      </div>
    </div>
  );
};

export default ProductCard;


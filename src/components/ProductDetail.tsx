import { Link, useParams } from "react-router-dom";
import { useProducts } from "./ProductContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { state } = useProducts();
  
  const product = state.products.find((p) => p.id === id);

  if (!product) {
    return <h2>Không tìm thấy sản phẩm</h2>;
  }

  return (
    <div>
      <h2>Chi tiết sản phẩm</h2>
      <h3>{product.ten}</h3>
      <p><strong>ID:</strong> {product.id}</p>
      <p><strong>Danh mục:</strong> {product.danhMuc}</p>
      <p><strong>Giá:</strong> {product.gia} VNĐ</p>
      <p><strong>Số lượng:</strong> {product.soLuong}</p>
      <p><strong>Mô tả:</strong> {product.moTa}</p>
      <hr />
      <Link to={`/edit/${product.id}`}>
        <button>Chỉnh sửa</button>
      </Link>
      <Link to="/">
        <button>Quay lại danh sách</button>
      </Link>
    </div>
  );
};

export default ProductDetail;


import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product, Category, useProducts } from "./ProductContext";

type FormErrors = {
  [key: string]: string;
};

const EditProduct = () => {
  const { id } = useParams();
  const { state, dispatch } = useProducts();
  const navigate = useNavigate();

  const productToEdit = state.products.find((p) => p.id === id);

  const [ten, setTen] = useState("");
  const [danhMuc, setDanhMuc] = useState<Category>("Khác");
  const [gia, setGia] = useState(0);
  const [soLuong, setSoLuong] = useState(0);
  const [moTa, setMoTa] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (productToEdit) {
      setTen(productToEdit.ten);
      setDanhMuc(productToEdit.danhMuc);
      setGia(productToEdit.gia);
      setSoLuong(productToEdit.soLuong);
      setMoTa(productToEdit.moTa);
    }
  }, [productToEdit]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (ten.trim().length < 3) {
      newErrors.ten = "Tên sản phẩm phải có ít nhất 3 ký tự";
    }
    if (gia <= 0) {
      newErrors.gia = "Giá phải là số dương";
    }
    if (soLuong <= 0 || !Number.isInteger(soLuong)) {
      newErrors.soLuong = "Số lượng phải là số nguyên dương";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && productToEdit) {
      const updatedProduct: Product = {
        id: productToEdit.id,
        ten,
        danhMuc,
        gia,
        soLuong,
        moTa,
      };
      dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });
      navigate("/");
    }
  };

  if (!productToEdit) {
    return <h2>Không tìm thấy sản phẩm</h2>;
  }

  return (
    <div>
      <h2>Chỉnh sửa sản phẩm: {productToEdit.ten}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên sản phẩm:</label>
          <input type="text" value={ten} onChange={(e) => setTen(e.target.value)} />
          {errors.ten && <p>{errors.ten}</p>}
        </div>
        <div>
          <label>Danh mục:</label>
          <select value={danhMuc} onChange={(e) => setDanhMuc(e.target.value as Category)}>
            <option value="Điện tử">Điện tử</option>
            <option value="Quần áo">Quần áo</option>
            <option value="Đồ ăn">Đồ ăn</option>
            <option value="Sách">Sách</option>
            <option value="Khác">Khác</option>
          </select>
        </div>
        <div>
          <label>Giá:</label>
          <input type="number" value={gia} onChange={(e) => setGia(Number(e.target.value))} />
          {errors.gia && <p>{errors.gia}</p>}
        </div>
        <div>
          <label>Số lượng:</label>
          <input type="number" value={soLuong} onChange={(e) => setSoLuong(Number(e.target.value))} />
          {errors.soLuong && <p>{errors.soLuong}</p>}
        </div>
        <div>
          <label>Mô tả:</label>
          <textarea value={moTa} onChange={(e) => setMoTa(e.target.value)} />
        </div>
        <button type="submit">Cập nhật</button>
        <button type="button" onClick={() => navigate("/")}>Hủy</button>
      </form>
    </div>
  );
};

export default EditProduct;


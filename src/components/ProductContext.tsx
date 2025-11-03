import { createContext, useContext, useReducer, ReactNode } from "react";

export type Category = "Điện tử" | "Quần áo" | "Đồ ăn" | "Sách" | "Khác";
export interface Product {
  id: string;
  ten: string;
  danhMuc: Category;
  gia: number;
  soLuong: number;
  moTa: string;
}

const initialProducts: Product[] = [
  {id: '1', ten: 'iPhone 15 Pro', danhMuc: 'Điện tử', gia: 25000000, soLuong: 10, moTa: 'Điện thoại mới nhất'},
  {id: '2', ten: 'Áo Thun Nam', danhMuc: 'Quần áo', gia: 150000, soLuong: 50, moTa: 'Chất liệu cotton'},
  {id: '3', ten: 'Sách Đắc Nhân Tâm', danhMuc: 'Sách', gia: 80000, soLuong: 100, moTa: 'Sách bán chạy'},
  {id: '4', ten: 'Bánh mì sandwich', danhMuc: 'Đồ ăn', gia: 25000, soLuong: 200, moTa: 'Bánh mì ngũ cốc'},
  {id: '5', ten: 'Macbook Pro M3', danhMuc: 'Điện tử', gia: 55000000, soLuong: 5, moTa: 'Chip M3 Pro mới'},
  {id: '6', ten: 'Quần Jean Nữ', danhMuc: 'Quần áo', gia: 450000, soLuong: 30, moTa: 'Jean co dãn'},
  {id: '7', ten: 'Tiểu thuyết "Nhà Giả Kim"', danhMuc: 'Sách', gia: 120000, soLuong: 70, moTa: 'Tiểu thuyết phiêu lưu'},
  {id: '8', ten: 'Samsung Galaxy S24', danhMuc: 'Điện tử', gia: 22000000, soLuong: 15, moTa: 'AI phone'},
  {id: '9', ten: 'Sữa Tươi Vinamilk', danhMuc: 'Đồ ăn', gia: 35000, soLuong: 150, moTa: 'Lốc 4 hộp'},
  {id: '10', ten: 'Áo Sơ Mi Nữ', danhMuc: 'Quần áo', gia: 300000, soLuong: 40, moTa: 'Vải lụa mát'},
];

interface State {
  products: Product[];
}

type Action =
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: string };

const initialState: State = {
  products: initialProducts,
};

const productReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [action.payload, ...state.products],
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    default:
      return state;
  }
};

interface ProductContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};


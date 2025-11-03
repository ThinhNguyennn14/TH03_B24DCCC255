import {NavLink} from 'react-router-dom';
const Navbar = () => {
    return (
        <nav>
            <NavLink to="/">Trang Chủ</NavLink>
            <NavLink to="/add">Thêm sản phẩm</NavLink>
        </nav>
    )
}
export default Navbar;
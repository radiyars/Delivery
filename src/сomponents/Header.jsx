import { Link } from "react-router-dom";
import logoSvg from "../assets/img/pizza-logo.svg";
import Search from "./Search/Search";
import { ReactComponent as CartSvg } from "./../assets/img/cart.svg";
import { useSelector } from "react-redux";
import { selectCart } from "../redux/slices/cartSlice";

const Header = () => {
  const { totalPrice, totalCount } = useSelector(selectCart);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        <Search />
        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>{totalPrice} ₽</span>
            <div className="button__delimiter"></div>
            <CartSvg />
            <span>{totalCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;

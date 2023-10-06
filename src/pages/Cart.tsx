import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../сomponents/CartItem";
import { ReactComponent as CartSvg } from "./../assets/img/cart.svg";
import { ReactComponent as LeftArrow } from "./../assets/img/grey-arrow-left.svg";
import { ReactComponent as TrashSvg } from "./../assets/img/trash.svg";
import { clearItems, selectCart } from "../redux/slices/cartSlice";
import CartEmpty from "../сomponents/CartEmpty";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalCount, totalPrice } = useSelector(selectCart);

  const onClickClear = () => {
    if (window.confirm("Очистить корзину?")) {
      dispatch(clearItems());
    }
  };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className=" container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <CartSvg /> Корзина
          </h2>
          <div onClick={onClickClear} className="cart__clear">
            <TrashSvg />
            <span>Очистить корзину</span>
          </div>
        </div>
        <div className="content__items">
          {items.map((item: any) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              {" "}
              Всего пицц: <b>{totalCount} шт.</b>{" "}
            </span>
            <span>
              {" "}
              Сумма заказа: <b>{totalPrice} ₽</b>{" "}
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
            >
              <LeftArrow />
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

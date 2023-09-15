import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../сomponents/CartItem";
import { ReactComponent as CartSvg } from "./../assets/img/cart.svg";
import { ReactComponent as LeftArrow } from "./../assets/img/grey-arrow-left.svg";
import { ReactComponent as TrashSvg } from "./../assets/img/trash.svg";

const Cart = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);

    return (
        <div className=" container container--cart">
            <div className="cart">
                <div className="cart__top">
                    <h2 className="content__title">
                        <CartSvg /> Корзина
                    </h2>
                    <div className="cart__clear">
                        <TrashSvg />
                        <span>Очистить корзину</span>
                    </div>
                </div>
                <div className="content__items">
                    {items.map((item) => (
                        <CartItem key={item.id} {...item} />
                    ))}
                </div>
                <div className="cart__bottom">
                    <div className="cart__bottom-details">
                        <span>
                            {" "}
                            Всего пицц: <b>3 шт.</b>{" "}
                        </span>
                        <span>
                            {" "}
                            Сумма заказа: <b>900 ₽</b>{" "}
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

import { useDispatch } from "react-redux";
import { ReactComponent as PlusSvg } from "./../assets/img/plus.svg";
import { addItem, removeItem } from "../redux/slices/cartSlice";

const CartItem = (props) => {
    const dispatch = useDispatch();

    const onClickPlus = () => {
        dispatch(addItem({ id: props.id }));
    };

    const onClickMinus = () => {
        dispatch(removeItem({ id: props.id }));
    };

    return (
        <div className="cart__item">
            <div className="cart__item-img">
                <img
                    className="pizza-block__image"
                    src={props.imageUrl}
                    alt="Pizza"
                />
            </div>
            <div className="cart__item-info">
                <h3>{props.title}</h3>
                <p>{props.type}, 26 см.</p>
            </div>
            <div className="cart__item-count">
                <div
                    onClick={onClickMinus}
                    className="button button--outline button--circle cart__item-count-minus"
                >
                    <PlusSvg />
                </div>
                <b>{props.count}</b>
                <div
                    onClick={onClickPlus}
                    className="button button--outline button--circle cart__item-count-plus"
                >
                    <PlusSvg />
                </div>
            </div>
            <div className="cart__item-price">
                <b>{props.price * props.count} ₽</b>
            </div>
            <div className="cart__item-remove">
                <div className="button button--outline button--circle">
                    <PlusSvg />
                </div>
            </div>
        </div>
    );
};

export default CartItem;

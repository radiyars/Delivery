import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { ReactComponent as PlusSvg } from "./../../assets/img/plus.svg";

const PizzaBlock = (props) => {
    const dispatch = useDispatch();
    const [activePizzaType, setActivePizzaType] = useState(0);
    const [activePizzaSize, setActivePizzaSize] = useState(0);

    const pizzaTypes = ["тонкое", "традиционное"];

    const onClickAdd = () => {
        const item = {
            id: props.id,
            title: props.title,
            price: props.price,
            imageUrl: props.imageUrl,
            type: activePizzaType,
            size: activePizzaSize,
        };

        dispatch(addItem(item));
    };

    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <img
                    className="pizza-block__image"
                    src={props.imageUrl}
                    alt="Pizza"
                />
                <h4 className="pizza-block__title">{props.title}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {props.types.map((item) => (
                            <li
                                key={item}
                                onClick={() => {
                                    setActivePizzaType(item);
                                }}
                                className={
                                    activePizzaType === item ? "active" : ""
                                }
                            >
                                {pizzaTypes[item]}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {props.sizes.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setActivePizzaSize(index);
                                }}
                                className={
                                    activePizzaSize === index ? "active" : ""
                                }
                            >
                                {item} см.
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {props.price} ₽</div>
                    <button
                        onClick={onClickAdd}
                        className="button button--outline button--add"
                    >
                        <PlusSvg />
                        <span>Добавить</span>
                        <i>{0}</i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PizzaBlock;

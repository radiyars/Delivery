import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectCartItemById } from "../../redux/slices/cartSlice";
import { ReactComponent as PlusSvg } from "./../../assets/img/plus.svg";

const pizzaTypes = ["тонкое", "традиционное"];

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));
  const [activePizzaType, setActivePizzaType] = useState(0);
  const [activePizzaSize, setActivePizzaSize] = useState(0);

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: pizzaTypes[activePizzaType],
      size: sizes[activePizzaSize],
    };

    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((item) => (
              <li
                key={item}
                onClick={() => {
                  setActivePizzaType(item);
                }}
                className={activePizzaType === item ? "active" : ""}
              >
                {pizzaTypes[item]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setActivePizzaSize(index);
                }}
                className={activePizzaSize === index ? "active" : ""}
              >
                {item} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <PlusSvg />
            <span>Добавить</span>
            {cartItem ? <i>{cartItem.count}</i> : <></>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;

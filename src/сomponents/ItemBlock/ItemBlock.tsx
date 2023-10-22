import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/cart/slice";
import { ReactComponent as PlusSvg } from "./../../assets/img/plus.svg";
import { Link } from "react-router-dom";
import { CartItem } from "../../redux/cart/types";
import { selectCartItemById } from "../../redux/cart/selectors";

const itemTypes = ["тонкое", "традиционное"];

type ItemBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  count: number;
  sizes: number[];
  types: number[];
};

const ItemBlock: React.FC<ItemBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));
  const [activeItemType, setActiveItemType] = useState(0);
  const [activeItemSize, setActiveItemSize] = useState(0);

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      count: 0,
      type: itemTypes[activeItemType],
      size: sizes[activeItemSize],
    };

    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link key={id} to={`/item/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((item) => (
              <li
                key={item}
                onClick={() => {
                  setActiveItemType(item);
                }}
                className={activeItemType === item ? "active" : ""}
              >
                {itemTypes[item]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setActiveItemSize(index);
                }}
                className={activeItemSize === index ? "active" : ""}
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

export default ItemBlock;

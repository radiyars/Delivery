import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

const Categories = () => {
    const categoryId = useSelector((state) => state.filters.categoryId);
    const dispatch = useDispatch();

    const categories = [
        "Все",
        "Мясные",
        "Вегетарианские",
        "Гриль",
        "Острые",
        "Закрытые",
    ];

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li
                        key={index}
                        onClick={() => dispatch(setCategoryId(index))}
                        className={categoryId === index ? "active" : ""}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;

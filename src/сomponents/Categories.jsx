import { useState } from "react";

const Categories = () => {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

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
                {categories.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => setActiveCategoryIndex(index)}
                        className={
                            activeCategoryIndex === index ? "active" : ""
                        }
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;

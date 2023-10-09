import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSort, setSortType } from "../redux/slices/filterSlice";
import { ReactComponent as ArrowTopSvg } from "./../assets/img/arrow-top.svg";

type SortItemProps = {
  name: string;
  sortProperty: string;
};

export const sortList: SortItemProps[] = [
  { name: "популярности", sortProperty: "rating" },
  { name: "цене", sortProperty: "price" },
  { name: "алфавиту", sortProperty: "title" },
];

const Sort = () => {
  const dispatch = useDispatch();
  const sortType = useSelector(selectSort);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const onClickSortItem = (obj: SortItemProps) => {
    dispatch(setSortType(obj));
    setIsOpenPopup(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path: Node[];
      };
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setIsOpenPopup(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <ArrowTopSvg />
        <b>Сортировка по:</b>
        <span
          onClick={() => {
            setIsOpenPopup(!isOpenPopup);
          }}
        >
          {sortType.name}
        </span>
      </div>
      {isOpenPopup && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, index) => (
              <li
                key={index}
                onClick={() => {
                  onClickSortItem(obj);
                }}
                className={
                  sortType.sortProperty === obj.sortProperty ? "active" : ""
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;

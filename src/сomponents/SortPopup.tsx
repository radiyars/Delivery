import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SORT_LIST,
  Sort,
  selectSort,
  setSortType,
} from "../redux/slices/filterSlice";
import { ReactComponent as ArrowTopSvg } from "./../assets/img/arrow-top.svg";

// type SortItemProps = {
//   name: string;
//   sortBy: string;
// };

// export const sortList: Sort[] = [
//   { name: "популярности", sortBy: SortByEnum.RATING },
//   { name: "цене", sortBy: SortByEnum.PRICE },
//   { name: "алфавиту", sortBy: SortByEnum.TITLE },
// ];

type PopupClick = MouseEvent & {
  path: Node[];
};

const SortPopup: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const sortType = useSelector(selectSort);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const onClickSortItem = (obj: Sort) => {
    dispatch(setSortType(obj));
    setIsOpenPopup(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
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
            {SORT_LIST.map((obj, index) => (
              <li
                key={index}
                onClick={() => {
                  onClickSortItem(obj);
                }}
                className={sortType.sortBy === obj.sortBy ? "active" : ""}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;

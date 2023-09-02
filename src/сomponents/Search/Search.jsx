import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../../redux/slices/filterSlice";
import { ReactComponent as CloseSvg } from "./../../assets/img/close.svg";
import { ReactComponent as SearchSvg } from "./../../assets/img/search.svg";
import styles from "./Search.module.scss";

const Search = () => {
    const searchText = useSelector((state) => state.filter.searchText);
    const dispatch = useDispatch();

    console.log("searchText:" + searchText);

    const onClickClear = () => {
        dispatch(setSearchText(""));
        // setValue("");
        // inputRef.current?.focus();
    };

    return (
        <div className={styles.root}>
            <SearchSvg className={styles.icon} />
            <input
                value={searchText}
                className={styles.input}
                placeholder="Поиск пиццы ..."
                onChange={(e) => dispatch(setSearchText(e.target.value))}
            ></input>
            {searchText && (
                <CloseSvg onClick={onClickClear} className={styles.clearIcon} />
            )}
        </div>
    );
};

export default Search;

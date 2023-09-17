import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../../redux/slices/filterSlice";
import { ReactComponent as CloseSvg } from "./../../assets/img/close.svg";
import { ReactComponent as SearchSvg } from "./../../assets/img/search.svg";
import styles from "./Search.module.scss";
import { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";

const Search = () => {
    const [inputText, setInputText] = useState("");
    const searchText = useSelector((state) => state.filters.searchText);
    const dispatch = useDispatch();
    const inputRef = useRef();

    const onClickClear = () => {
        dispatch(setSearchText(""));
        setInputText("");
        inputRef.current?.focus();
    };

    const onChangeInput = (event) => {
        setInputText(event.target.value);
        updateSearchText(event.target.value);
    };

    const updateSearchText = useCallback(
        debounce((text) => {
            dispatch(setSearchText(text));
        }, 500),
        []
    );

    return (
        <div className={styles.root}>
            <SearchSvg className={styles.icon} />
            <input
                ref={inputRef}
                value={inputText}
                className={styles.input}
                placeholder="Поиск пиццы ..."
                onChange={onChangeInput}
            ></input>
            {searchText && (
                <CloseSvg onClick={onClickClear} className={styles.clearIcon} />
            )}
        </div>
    );
};

export default Search;

import styles from "./Search.module.scss";
import { ReactComponent as SearchSvg } from "./../../assets/img/search.svg";
import { ReactComponent as CloseSvg } from "./../../assets/img/close.svg";
import { useContext } from "react";
import { SearchContext } from "../../App";

const Search = () => {
  const { searchText, setSearchText } = useContext(SearchContext);

  const onClickClear = () => {
    setSearchText("");
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
        // onInput={(e)=> props.setFilterText(e.target.value)}
        onChange={(e) => setSearchText(e.target.value)}
      ></input>
      {searchText && (
        <CloseSvg onClick={onClickClear} className={styles.clearIcon} />
      )}
    </div>
  );
};

export default Search;

import styles from "./Search.module.scss";
import { ReactComponent as SearchSvg } from "./../../assets/img/search.svg";
import { ReactComponent as CloseSvg } from "./../../assets/img/close.svg";

const Search = (props) => {
  const onClickClear = () => {
    props.setFilterText("");
    // setValue("");
    // inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <SearchSvg className={styles.icon} />
      <input
        value={props.filterText}
        className={styles.input}
        placeholder="Поиск пиццы ..."
        // onInput={(e)=> props.setFilterText(e.target.value)}
        onChange={(e) => props.setFilterText(e.target.value)}
      ></input>
      {props.filterText && (
        <CloseSvg onClick={onClickClear} className={styles.clearIcon} />
      )}
    </div>
  );
};

export default Search;

import { useState } from "react";
import sprite from "../../../assets/icons/sprite.svg";
import styles from "./SearchField.module.css";

const SearchField = ({
  onSearch,
  value: initialValue = "",
  placeholder = "Search",
  className = "",
  inputStyle = {},
  svgStyle = {},
}) => {
  const [value, setValue] = useState(initialValue);

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(value);
  };

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`${styles.inputWrap} ${className}`}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={styles.input}
        style={inputStyle}
      />
      <button
        type="button"
        onClick={handleSearch}
        className={styles.buttonSearch}
        aria-label="Search"
      >
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="#262626"
          className={styles.searchIcon}
          style={{ ...svgStyle, display: "block" }}
        >
          <use href={`${sprite}#icon-search`} />
        </svg>
      </button>

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className={styles.buttonClear}
          aria-label="Clear search"
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="#262626"
            className={styles.clearIcon}
            style={{ ...svgStyle, display: "block" }}
          >
            <use href={`${sprite}#icon-cross`} />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchField;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  selectCategories,
  selectGenders,
  selectLocations,
  selectTypes,
} from "../../../redux/notices/selectors";
import {
  getCategories,
  getGenders,
  getNotices,
  getTypes,
  searchLocations,
} from "../../../redux/notices/operations";
import SearchField from "../../Shared/SearchField/SearchField";
import Button from "../../Shared/Button/Button";
import sprite from "../../../assets/icons/sprite.svg";
import styles from "./NoticesFilters.module.css";

const NoticesFilters = ({ currentPage, setCurrentPage }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const sex = useSelector(selectGenders);
  const species = useSelector(selectTypes);
  const locations = useSelector(selectLocations);

  const [locationInput, setLocationInput] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    gender: "",
    type: "",
    location: "",
    radioSearch: "",
  });

  const [isMenuOpen, setIsMenuOpen] = useState({
    category: false,
    gender: false,
    type: false,
  });

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getGenders());
    dispatch(getTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getNotices({
        keyword: filters.search,
        category: filters.category,
        species: filters.type,
        sex: filters.gender,
        locationId: filters.location,
        radioSearch: filters.radioSearch,
        page: currentPage,
        limit: 6,
      })
    );
  }, [dispatch, filters, currentPage]);

  const handleInputChange = (name) => (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({
      search: "",
      category: "",
      gender: "",
      type: "",
      location: "",
      radioSearch: "",
    });
    setLocationInput("");
    setCurrentPage(1);
    setShowLocationDropdown(false);
  };

  const optionsData = (options) => {
    const safeOptions = Array.isArray(options) ? options : [];

    return [
      { value: "", label: "Show all" },
      ...safeOptions.map((option) => {
        const value = typeof option === "string" ? option : "";
        const label =
          typeof option === "string"
            ? option.charAt(0).toUpperCase() + option.slice(1)
            : "";

        return { value, label };
      }),
    ];
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocationInput(value);

    if (value === "") {
      setFilters((prev) => ({ ...prev, location: "" }));
      setShowLocationDropdown(false);
    }
    else if (value.length >= 3) {
      dispatch(searchLocations(value));
      setShowLocationDropdown(true);
    } else {
      setShowLocationDropdown(false);
    }
  };

  const handleLocationSelect = (location) => {
    setFilters((prev) => ({ ...prev, location: location._id }));
    setLocationInput(`${location.stateEn}, ${location.cityEn}`);
    setShowLocationDropdown(false);
  };

  const filteredLocations = locations || [];

  const selectValue = (field, options) => {
    if (filters[field] === "") {
      return null;
    }

    if (!Array.isArray(options)) {
      return null;
    }

    return options.find((option) => option.value === filters[field]) || null;
  };

  const handleClear = () => {
    setFilters((prev) => ({ ...prev, radioSearch: "" }));
  };

  const handleClearLocation = () => {
    setFilters((prev) => ({ ...prev, location: "" }));
    setLocationInput("");
    setShowLocationDropdown(false);
  };

  const isAnyFilterActive = () => {
    return (
      filters.search ||
      filters.category ||
      filters.gender ||
      filters.type ||
      filters.location ||
      filters.radioSearch
    );
  };

  const handleMenuOpen = (field, isOpen) => {
    setIsMenuOpen((prev) => ({
      ...prev,
      [field]: isOpen,
    }));
  };

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "42px",
      height: "42px",
      borderRadius: "30px",
      border: "1px solid rgba(38, 38, 38, 0.15)",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid rgba(38, 38, 38, 0.15)",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 12px",
      height: "42px",
      display: "flex",
      alignItems: "center",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      display: "none", 
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "15px",
      marginTop: "4px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "transparent"
        : state.isFocused
        ? "rgba(246, 184, 61, 0.1)"
        : "transparent",
      color: state.isSelected ? "#f6b83d" : "rgba(38, 38, 38, 0.6)",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "rgba(246, 184, 61, 0.1)",
      },
    }),
  };

  const isTabletOrDesktop = window.innerWidth >= 768;

  if (isTabletOrDesktop) {
    customSelectStyles.control.height = "48px";
    customSelectStyles.control.minHeight = "48px";
    customSelectStyles.valueContainer.height = "48px";
  }

  return (
    <div className={styles.container}>
      <div className={styles.allFilters}>
        <div className={styles.searchRow}>
          <div className={styles.searchField}>
            <SearchField
              onSearch={(value) => handleInputChange("search")(value)}
              value={filters.search}
              placeholder="Search"
              className={styles.customSearchField}
            />
          </div>

          <div className={styles.selectField}>
            <Select
              options={optionsData(categories)}
              value={selectValue("category", optionsData(categories))}
              onChange={(selected) =>
                handleInputChange("category")(selected ? selected.value : "")
              }
              placeholder="Category"
              isClearable
              className={styles.select}
              classNamePrefix="notice-select"
              styles={customSelectStyles}
              onMenuOpen={() => handleMenuOpen("category", true)}
              onMenuClose={() => handleMenuOpen("category", false)}
            />
            <div
              className={`${styles.selectArrow} ${
                isMenuOpen.category ? styles.selectArrowUp : ""
              }`}
            >
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="#262626"
                style={{ display: "block" }}
              >
                <use href={`${sprite}#icon-arrow-down`} />
              </svg>
            </div>
          </div>

          <div className={styles.selectField}>
            <Select
              options={optionsData(sex)}
              value={selectValue("gender", optionsData(sex))}
              onChange={(selected) =>
                handleInputChange("gender")(selected ? selected.value : "")
              }
              placeholder="By gender"
              isClearable
              className={styles.select}
              classNamePrefix="notice-select"
              styles={customSelectStyles}
              onMenuOpen={() => handleMenuOpen("gender", true)}
              onMenuClose={() => handleMenuOpen("gender", false)}
            />
            <div
              className={`${styles.selectArrow} ${
                isMenuOpen.gender ? styles.selectArrowUp : ""
              }`}
            >
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="#262626"
                style={{ display: "block" }}
              >
                <use href={`${sprite}#icon-arrow-down`} />
              </svg>
            </div>
          </div>

          <div className={styles.selectField}>
            <Select
              options={optionsData(species)}
              value={selectValue("type", optionsData(species))}
              onChange={(selected) =>
                handleInputChange("type")(selected ? selected.value : "")
              }
              placeholder="By type"
              isClearable
              className={styles.select}
              classNamePrefix="notice-select"
              styles={customSelectStyles}
              onMenuOpen={() => handleMenuOpen("type", true)}
              onMenuClose={() => handleMenuOpen("type", false)}
            />
            <div
              className={`${styles.selectArrow} ${
                isMenuOpen.type ? styles.selectArrowUp : ""
              }`}
            >
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="#262626"
                style={{ display: "block" }}
              >
                <use href={`${sprite}#icon-arrow-down`} />
              </svg>
            </div>
          </div>

          <div className={styles.locationField}>
            <input
              type="text"
              value={locationInput}
              onChange={handleLocationChange}
              placeholder="Location"
              className={styles.locationInput}
            />

            <div className={styles.locationIconWrap}>
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="#262626"
                style={{ display: "block" }}
              >
                <use href={`${sprite}#icon-search`} />
              </svg>
            </div>

            {locationInput && (
              <button
                type="button"
                onClick={handleClearLocation}
                className={styles.buttonClear}
                aria-label="Clear location"
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="#262626"
                  style={{ display: "block" }}
                >
                  <use href={`${sprite}#icon-cross`} />
                </svg>
              </button>
            )}

            {showLocationDropdown && filteredLocations.length > 0 && (
              <ul className={styles.locationDropdown}>
                {filteredLocations.map((location) => (
                  <li
                    key={location._id}
                    className={styles.locationOption}
                    onClick={() => handleLocationSelect(location)}
                  >
                    {location.stateEn}, {location.cityEn}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.divider}></div>

        <ul className={styles.radioButtonWrap}>
          {["Popular", "Unpopular", "Cheap", "Expensive"].map((option) => (
            <li
              key={option}
              className={filters.radioSearch === option ? styles.checked : ""}
            >
              <input
                type="radio"
                id={option}
                name="radioSearch"
                value={option}
                checked={filters.radioSearch === option}
                onChange={() => handleInputChange("radioSearch")(option)}
                className={styles.radioInput}
              />
              <label htmlFor={option} className={styles.radioLabel}>
                {option}
              </label>
              {filters.radioSearch === option && (
                <button
                  type="button"
                  onClick={handleClear}
                  className={styles.clearRadioButton}
                  aria-label={`Clear ${option} filter`}
                >
                  <svg
                    width="18"
                    height="18"
                    fill="#ffffff"
                    stroke="#ffffff"
                    style={{ display: "block" }}
                  >
                    <use href={`${sprite}#icon-cross`} />
                  </svg>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {isAnyFilterActive() && (
        <Button
          onClick={handleReset}
          className={styles.resetButton}
          variant="primary"
          size="small"
        >
          Reset
        </Button>
      )}
    </div>
  );
};

export default NoticesFilters;

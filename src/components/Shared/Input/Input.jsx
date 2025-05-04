import { forwardRef, useState } from "react";
import sprite from "../../../assets/images/sprite.svg";
import styles from "./Input.module.css";

const Input = forwardRef(
  (
    {
      type = "text",
      placeholder,
      name,
      value,
      onChange,
      onBlur,
      error,
      secure,
      icon,
      className = "",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputType = type === "password" && showPassword ? "text" : type;

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = (e) => {
      setIsFocused(false);
      if (onBlur) onBlur(e);
    };

    const inputClasses = [
      styles.input,
      error ? styles.error : "",
      secure ? styles.secure : "",
      isFocused ? styles.focused : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={inputClasses}
          {...props}
        />

        {type === "password" && (
          <button
            type="button"
            className={styles.iconButton}
            onClick={togglePasswordVisibility}
            tabIndex="-1"
          >
            {showPassword ? (
              <svg className={styles.icon} fill="#f6b83d">
                <use href={`${sprite}#icon-eye`} />
              </svg>
            ) : (
              <svg className={styles.icon}>
                <use href={`${sprite}#icon-eye-off`} />
              </svg>
            )}
          </button>
        )}

        {error && (
          <svg className={styles.errorIcon}>
            <use href={`${sprite}#icon-cross-red`} />
          </svg>
        )}

        {secure && (
          <div className={styles.secureWrap}>
            <svg className={styles.checkIcon}>
              <use href={`${sprite}#icon-check`} />
            </svg>
          </div>
        )}

        {icon && (
          <svg className={styles.inputIcon}>
            <use href={`${sprite}#${icon}`} />
          </svg>
        )}

        {error && <p className={styles.errorMessage}>{error}</p>}
        {secure && <p className={styles.secureMessage}>Password is secure</p>}
      </div>
    );
  }
);

export default Input;

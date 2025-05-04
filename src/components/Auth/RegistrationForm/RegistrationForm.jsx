import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "../../../utils/validationSchemas";
import { register as registerUser } from "../../../redux/auth/operations";
import sprite from "../../../assets/icons/sprite.svg";
import styles from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [passwordLength, setPasswordLength] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const handleTogglePassword = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleToggleConfirmPassword = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  };

  const handlePasswordChange = (event) => {
    setPasswordLength(event.target.value.length);
  };

  const onSubmit = (data) => {
    const { name, email, password } = data;
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputWrap}>
        <div className={styles.nameWrap}>
          <input
            className={styles.input}
            placeholder="Name"
            {...register("name")}
            data-error={errors.name ? "true" : "false"}
          />
          {errors.name && (
            <svg className={styles.errorIcon} style={{ display: "block" }}>
              <use href={`${sprite}#icon-cross-red`} />
            </svg>
          )}
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

        <div className={styles.emailWrap}>
          <input
            className={styles.input}
            placeholder="Email"
            {...register("email")}
            data-error={errors.email ? "true" : "false"}
            autoComplete="username"
          />
          {errors.email && (
            <svg className={styles.errorIcon} style={{ display: "block" }}>
              <use href={`${sprite}#icon-cross-red`} />
            </svg>
          )}
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.passwordWrap}>
          <input
            className={styles.input}
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            onChange={handlePasswordChange}
            data-secure={passwordLength >= 11 ? "true" : "false"}
            autoComplete="new-password"
          />
          {isPasswordVisible ? (
            <svg
              className={styles.eyeIcon}
              fill="#f6b83d"
              onClick={handleTogglePassword}
              style={{ display: "block", zIndex: 5 }}
            >
              <use href={`${sprite}#icon-eye`} />
            </svg>
          ) : (
            <svg
              className={styles.eyeIcon}
              onClick={handleTogglePassword}
              fill="none"
              stroke="#f6b83d"
              style={{ display: "block", zIndex: 5 }}
            >
              <use href={`${sprite}#icon-eye-off`} />
            </svg>
          )}
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
          {passwordLength >= 11 && (
            <div className={styles.secureWrap}>
              <svg
                className={styles.checkIcon}
                style={{ display: "block", zIndex: 5 }}
                fill="none"
                stroke="#08aa83"
              >
                <use href={`${sprite}#icon-check`} />
              </svg>
              <p className={styles.secureMessage}>Password is secure</p>
            </div>
          )}
        </div>

        <div className={styles.confirmPasswordWrap}>
          <input
            className={styles.input}
            type={isConfirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            data-error={errors.confirmPassword ? "true" : "false"}
            autoComplete="new-password"
          />
          {isConfirmPasswordVisible ? (
            <svg
              className={styles.eyeIcon}
              fill="#f6b83d"
              onClick={handleToggleConfirmPassword}
              style={{
                display: "block",
                zIndex: 5,
                position: "absolute",
                right: "12px",
                top: "14px",
              }}
            >
              <use href={`${sprite}#icon-eye`} />
            </svg>
          ) : (
            <svg
              className={styles.eyeIcon}
              onClick={handleToggleConfirmPassword}
              fill="none"
              stroke="#f6b83d"
              style={{
                display: "block",
                zIndex: 5,
                position: "absolute",
                right: "12px",
                top: "14px",
              }}
            >
              <use href={`${sprite}#icon-eye-off`} />
            </svg>
          )}
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <button type="submit" className={styles.button}>
        Registration
      </button>
    </form>
  );
};

export default RegistrationForm;

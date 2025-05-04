import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../utils/validationSchemas";
import { login } from "../../../redux/auth/operations";
import sprite from "../../../assets/icons/sprite.svg";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordLength, setPasswordLength] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleTogglePassword = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handlePasswordChange = (event) => {
    setPasswordLength(event.target.value.length);
  };

  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(login({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputWrap}>
        <div className={styles.emailWrap}>
          <input
            className={styles.input}
            placeholder="Email"
            {...register("email")}
            data-error={errors.email ? "true" : "false"}
            autoComplete="username"
          />
          {errors.email && (
            <svg className={styles.errorIcon}>
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
            >
              <use href={`${sprite}#icon-eye`} />
            </svg>
          ) : (
            <svg className={styles.eyeIcon} onClick={handleTogglePassword}>
              <use href={`${sprite}#icon-eye-off`} />
            </svg>
          )}
          {errors.password && passwordLength < 7 && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
          {passwordLength >= 11 && (
            <div className={styles.secureWrap}>
              <svg className={styles.checkIcon}>
                <use href={`${sprite}#icon-check`} />
              </svg>
              <p className={styles.secureMessage}>Password is secure</p>
            </div>
          )}
        </div>
      </div>

      <button type="submit" className={styles.button}>
        Log In
      </button>
    </form>
  );
};

export default LoginForm;

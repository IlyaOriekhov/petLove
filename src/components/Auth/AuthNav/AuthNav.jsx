import { Link } from "react-router-dom";
import styles from "./AuthNav.module.css";

const AuthNav = ({ isHomePage }) => {
  return (
    <nav className={styles.nav}>
      <Link
        to="/login"
        className={`${styles.loginLink} ${
          isHomePage ? styles.homeLoginLink : ""
        }`}
      >
        Log In
      </Link>
      <Link to="/register" className={styles.registerLink}>
        Registration
      </Link>
    </nav>
  );
};

export default AuthNav;

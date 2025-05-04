import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectIsLoggedIn } from "../../../redux/auth/selectors";
import sprite from "../../../assets/icons/sprite.svg";
import styles from "./UserBar.module.css";

const UserBar = ({ isHomePage }) => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Link to="/profile" className={styles.link}>
      <button type="button" className={styles.button}>
        {user.avatar ? (
          <img src={user.avatar} alt="User avatar" className={styles.avatar} />
        ) : (
          <svg
            width="20"
            height="20"
            fill="#f6b83d"
            stroke="#f6b83d"
            style={{ display: "block" }}
          >
            <use href={`${sprite}#icon-user`} />
          </svg>
        )}
      </button>
      <p
        className={`${styles.userName} ${
          isHomePage ? styles.homeUserName : ""
        }`}
      >
        {user.name}
      </p>
    </Link>
  );
};

export default UserBar;

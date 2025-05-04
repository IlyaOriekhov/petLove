import { useLocation } from "react-router-dom";
import UserBar from "../UserBar/UserBar";
import LogOutBtn from "../../Auth/LogOutBtn/LogOutBtn";
import styles from "./UserNav.module.css";

const UserNav = ({ isHomePage }) => {
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  return (
    <nav className={styles.nav}>
      {!isHomepage && <LogOutBtn />}
      <UserBar isHomePage={isHomePage} />
    </nav>
  );
};

export default UserNav;

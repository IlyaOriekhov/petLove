import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/auth/operations";
import { selectIsLoggedIn } from "../../../redux/auth/selectors";
import UserNav from "../../User/UserNav/UserNav";
import AuthNav from "../../Auth/AuthNav/AuthNav";
import ModalApproveAction from "../../Modal/ModalApproveAction/ModalApproveAction";
import sprite from "../../../assets/icons/sprite.svg";

import logoMob from "../../../assets/icons/logo_mob.svg";
import logoTabDesk from "../../../assets/icons/logo_desk_tab.svg";
import logoWhiteMob from "../../../assets/icons/logowhite_mob.svg";
import logoWhiteTabDesk from "../../../assets/icons/logowhite_desk_tab.svg";

import styles from "./Header.module.css";

const Header = () => {
  const menuRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();

  const isHomePage = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`${styles.header} ${isHomePage ? styles.homeHeader : ""}`}
    >
      <Link to="/" className={styles.logoLink}>
        <div className={styles.logoWrap}>
          {isHomePage ? (
            <picture>
              <source srcSet={logoWhiteTabDesk} media="(min-width: 768px)" />
              <img
                src={logoWhiteMob}
                alt="Petlove logo"
                className={styles.logoImage}
              />
            </picture>
          ) : (
            <picture>
              <source srcSet={logoTabDesk} media="(min-width: 768px)" />
              <img
                src={logoMob}
                alt="Petlove logo"
                className={styles.logoImage}
              />
            </picture>
          )}
        </div>
      </Link>

      <nav className={styles.nav}>
        <NavLink
          to="/news"
          className={({ isActive }) =>
            `${styles.navLink} ${isHomePage ? styles.homeNavLink : ""} ${
              isActive ? styles.activeNavLink : ""
            }`
          }
        >
          News
        </NavLink>
        <NavLink
          to="/notices"
          className={({ isActive }) =>
            `${styles.navLink} ${isHomePage ? styles.homeNavLink : ""} ${
              isActive ? styles.activeNavLink : ""
            }`
          }
        >
          Find pet
        </NavLink>
        <NavLink
          to="/friends"
          className={({ isActive }) =>
            `${styles.navLink} ${isHomePage ? styles.homeNavLink : ""} ${
              isActive ? styles.activeNavLink : ""
            }`
          }
        >
          Our friends
        </NavLink>
      </nav>

      {isLoggedIn ? (
        <UserNav isHomePage={isHomePage} />
      ) : (
        <AuthNav isHomePage={isHomePage} />
      )}

      <button
        type="button"
        className={styles.burgerButton}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg
          width="32"
          height="32"
          fill="none"
          stroke={isHomePage ? "#FFFFFF" : "#262626"}
          className={isHomePage ? styles.homeIcon : ""}
        >
          <use href={`${sprite}#icon-menu`} />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${styles.burgerMenu} ${
          isMenuOpen ? styles.burgerMenuOpen : ""
        } ${isHomePage ? styles.homeBurgerMenu : ""} ${
          isLoginPage || isRegisterPage ? styles.coloredBurgerMenu : ""
        }`}
        ref={menuRef}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={closeMenu}
          aria-label="Close menu"
        >
          <svg
            width="32"
            height="32"
            fill="none"
            stroke={
              isHomePage || isLoginPage || isRegisterPage
                ? "#FFFFFF"
                : "#262626"
            }
          >
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>

        <nav className={styles.mobileNav}>
          <NavLink
            to="/news"
            onClick={closeMenu}
            className={({ isActive }) =>
              `${styles.mobileNavLink} ${
                isActive ? styles.activeMobileNavLink : ""
              }`
            }
          >
            News
          </NavLink>
          <NavLink
            to="/notices"
            onClick={closeMenu}
            className={({ isActive }) =>
              `${styles.mobileNavLink} ${
                isActive ? styles.activeMobileNavLink : ""
              }`
            }
          >
            Find pet
          </NavLink>
          <NavLink
            to="/friends"
            onClick={closeMenu}
            className={({ isActive }) =>
              `${styles.mobileNavLink} ${
                isActive ? styles.activeMobileNavLink : ""
              }`
            }
          >
            Our friends
          </NavLink>
        </nav>

        {isLoggedIn ? (
          <button onClick={openModal} className={styles.logoutButton}>
            Log out
          </button>
        ) : (
          <div className={styles.mobileAuthNav}>
            <Link
              to="/login"
              onClick={closeMenu}
              className={styles.mobileLoginLink}
            >
              Log In
            </Link>
            <Link
              to="/register"
              onClick={closeMenu}
              className={styles.mobileRegisterLink}
            >
              Registration
            </Link>
          </div>
        )}
      </div>

      {isModalOpen && (
        <ModalApproveAction
          onClose={closeMenu}
          onConfirm={handleLogout}
          message="Already leaving?"
          confirmText="Yes"
          cancelText="Cancel"
        />
      )}
    </header>
  );
};

export default Header;

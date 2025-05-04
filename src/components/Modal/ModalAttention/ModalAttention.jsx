import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import sprite from "../../../assets/icons/sprite.svg";
import dogImage from "../../../assets/images/dog.png";
import styles from "./ModalAttention.module.css";

const modalRoot =
  document.getElementById("modal-root") || document.createElement("div");

if (!document.getElementById("modal-root")) {
  modalRoot.id = "modal-root";
  document.body.appendChild(modalRoot);
}

const ModalAttention = ({ onClose }) => {
  const handleClose = () => {
    onClose();
  };

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "visible";
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24" fill="none" stroke="#262626">
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>

        <span className={styles.iconWrapper}>
          <picture>
            <source srcSet={`${dogImage}`} media="(min-resolution: 192dpi)" />
            <img
              src={dogImage}
              alt="Dog"
              width="44"
              height="44"
              className={styles.dogIcon}
            />
          </picture>
        </span>

        <h2 className={styles.title}>Attention</h2>

        <p className={styles.text}>
          We would like to remind you that certain functionality is available
          only to authorized users. If you have an account, please log in with
          your credentials. If you do not already have an account, you must
          register to access these features.
        </p>

        <div className={styles.buttonWrap}>
          <Link to="/login" className={styles.loginLink}>
            Log In
          </Link>
          <Link to="/register" className={styles.registerLink}>
            Registration
          </Link>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default ModalAttention;

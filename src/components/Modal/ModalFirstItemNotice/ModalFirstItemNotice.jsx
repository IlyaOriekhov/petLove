import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import sprite from "../../../assets/icons/sprite.svg";
import catImage from "../../../assets/images/cat.png";
import styles from "./ModalFirstItemNotice.module.css";

const modalRoot =
  document.getElementById("modal-root") || document.createElement("div");

if (!document.getElementById("modal-root")) {
  modalRoot.id = "modal-root";
  document.body.appendChild(modalRoot);
}

const ModalFirstItemNotice = ({ onClose }) => {
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
            <source srcSet={`${catImage}`} media="(min-resolution: 192dpi)" />
            <img
              src={catImage}
              alt="Cat"
              width="44"
              height="44"
              className={styles.catIcon}
            />
          </picture>
        </span>

        <h2 className={styles.title}>Congrats</h2>

        <p className={styles.text}>
          The first fluff in the favorites! May your friendship be the happiest
          and filled with fun.
        </p>

        <Link to="/profile" className={styles.profileLink}>
          Go to profile
        </Link>
      </div>
    </div>,
    modalRoot
  );
};

export default ModalFirstItemNotice;

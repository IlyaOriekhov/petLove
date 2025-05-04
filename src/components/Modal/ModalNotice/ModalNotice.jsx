import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNotice, deleteNotice } from "../../../redux/notices/operations";
import { formatBirthday } from "../../../utils/formatDate";
import sprite from "../../../assets/icons/sprite.svg";
import styles from "./ModalNotice.module.css";

const modalRoot =
  document.getElementById("modal-root") || document.createElement("div");

if (!document.getElementById("modal-root")) {
  modalRoot.id = "modal-root";
  document.body.appendChild(modalRoot);
}

const ModalNotice = ({
  notice,
  isFavorite,
  onClose,
  setIsFavorite,
  setShowFirstNotice,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";

  const {
    _id,
    imgURL,
    name,
    title,
    birthday,
    sex,
    species,
    popularity,
    comment,
    category,
  } = notice;

  const handleClose = () => {
    onClose();
  };

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(deleteNotice(_id));
      setIsFavorite(false);
    } else {
      if (setShowFirstNotice) {
        setShowFirstNotice(true);
      }
      dispatch(addNotice(_id));
      setIsFavorite(true);
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

        <img src={imgURL} alt={title} className={styles.img} />
        <span className={styles.category}>{category}</span>

        <h2 className={styles.title}>{title}</h2>

        <div className={styles.rating}>
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              width={16}
              height={16}
              fill={
                index < Math.ceil((popularity / 100) * 5)
                  ? "#FFC531"
                  : "#F4F4F4"
              }
            >
              <use href={`${sprite}#icon-star`} />
            </svg>
          ))}
          <span className={styles.popularityText}>{popularity}</span>
        </div>

        <div className={styles.detailsWrap}>
          <p className={styles.detailsTitle}>
            Name <span>{name}</span>
          </p>
          <p className={styles.detailsTitle}>
            Birthday <span>{formatBirthday(birthday)}</span>
          </p>
          <p className={styles.detailsTitle}>
            Sex <span>{sex}</span>
          </p>
          <p className={styles.detailsTitle}>
            Species <span>{species}</span>
          </p>
        </div>

        <p className={styles.comment}>{comment}</p>

        <div className={styles.buttonWrap}>
          {!isProfilePage && (
            <button
              type="button"
              onClick={handleFavoriteClick}
              className={styles.buttonFavorite}
            >
              {isFavorite ? "Remove from" : "Add to"}
              <svg width="18" height="18" stroke="#FFFFFF" fill="none">
                <use href={`${sprite}#icon-heart`} />
              </svg>
            </button>
          )}
          <button type="button" className={styles.buttonContact}>
            <Link to={"mailto:test@gmail.com"} target="_blank">
              Contact
            </Link>
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default ModalNotice;

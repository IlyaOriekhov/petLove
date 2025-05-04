import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/auth/operations";
import catImage from "../../../assets/images/cat.png";
import sprite from "../../../assets/icons/sprite.svg";
import styles from "./ModalApproveAction.module.css";

const modalRoot =
  document.getElementById("modal-root") || document.createElement("div");

if (!document.getElementById("modal-root")) {
  modalRoot.id = "modal-root";
  document.body.appendChild(modalRoot);
}

const ModalApproveAction = ({
  onClose,
  onConfirm,
  message = "Already leaving?",
  confirmText = "Yes",
  cancelText = "Cancel",
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    } else {
      await dispatch(logout());

      onClose();

      navigate("/");

      setTimeout(() => {
        window.location.reload();
      }, 200);
    }
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
        <div className={styles.content}>
          <span className={styles.iconWrapper}>
            <source srcSet={`${catImage}`} media="(min-resolution: 192dpi)" />
            <img
              src={catImage}
              alt="Cat"
              width="44"
              height="44"
              className={styles.catIcon}
            />
          </span>
          <p className={styles.text}>{message}</p>
          <div className={styles.buttonWrap}>
            <button className={styles.buttonConfirm} onClick={handleConfirm}>
              {confirmText}
            </button>
            <button className={styles.buttonCancel} onClick={handleClose}>
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default ModalApproveAction;

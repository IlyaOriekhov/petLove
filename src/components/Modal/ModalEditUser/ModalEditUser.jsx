import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editUserSchema } from "../../../utils/validationSchemas";
import { updateUser } from "../../../redux/auth/operations";
import sprite from "../../../assets/icons/sprite.svg";
import Button from "../../Shared/Button/Button";
import styles from "./ModalEditUser.module.css";

const modalRoot =
  document.getElementById("modal-root") || document.createElement("div");

if (!document.getElementById("modal-root")) {
  modalRoot.id = "modal-root";
  document.body.appendChild(modalRoot);
}

const ModalEditUser = ({ onClose, user, imageURL, setImageURL }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editUserSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      avatar: user.avatar || "",
      phone: user.phone || "+380",
    },
  });

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

  const onSubmit = (data) => {
    dispatch(updateUser(data));
    onClose();
  };

  const handleUploadAvatar = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pet_app_upload");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxxohv4f7/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const secureUrl = data.secure_url;

      if (secureUrl) {
        setImageURL(secureUrl);
        setValue("avatar", secureUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return createPortal(
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24">
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>

        <h2 className={styles.title}>Edit information</h2>

        {user.avatar || imageURL ? (
          <img
            src={imageURL || user.avatar}
            alt={user.name}
            className={styles.avatar}
          />
        ) : (
          <span className={styles.avatarPlaceholder}>
            <svg width="40" height="40" fill="#f6b83d" stroke="#f6b83d">
              <use href={`${sprite}#icon-user`} />
            </svg>
          </span>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.avatarContainer}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                className={styles.input}
                placeholder="Avatar URL"
                {...register("avatar")}
              />
              {errors.avatar && (
                <p className={styles.errorText}>{errors.avatar.message}</p>
              )}
            </div>

            <label className={styles.uploadLabel}>
              <input
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={handleUploadAvatar}
              />
              <span className={styles.uploadButton}>
                Upload photo
                <svg width="18" height="18">
                  <use href={`${sprite}#icon-upload-cloud`} />
                </svg>
              </span>
            </label>
          </div>

          <div className={styles.inputWrap}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                className={styles.input}
                placeholder="Name"
                {...register("name")}
              />
              {errors.name && (
                <p className={styles.errorText}>{errors.name.message}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="email"
                className={styles.input}
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <p className={styles.errorText}>{errors.email.message}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="tel"
                className={styles.input}
                placeholder="Phone"
                {...register("phone")}
              />
              {errors.phone && (
                <p className={styles.errorText}>{errors.phone.message}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className={styles.saveButton}
            variant="primary"
            size="medium"
          >
            Save
          </Button>
        </form>
      </div>
    </div>,
    modalRoot
  );
};

export default ModalEditUser;

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotice,
  deleteNotice,
  getOneNotice,
} from "../../../redux/notices/operations";
import {
  selectFavoritesNotices,
  selectIsLoggedIn,
} from "../../../redux/auth/selectors";
import { refreshUser } from "../../../redux/auth/operations";
import { formatBirthday } from "../../../utils/formatDate";
import ModalAttention from "../../Modal/ModalAttention/ModalAttention";
import ModalNotice from "../../Modal/ModalNotice/ModalNotice";
import ModalFirstItemNotice from "../../Modal/ModalFirstItemNotice/ModalFirstItemNotice";
import sprite from "../../../assets/icons/sprite.svg";
import styles from "./NoticesItem.module.css";
import { toast } from "react-toastify";

const NoticesItem = ({ notice }) => {
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
    price,
  } = notice;

  const dispatch = useDispatch();
  const [showAttentionModal, setShowAttentionModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showFirstNotice, setShowFirstNotice] = useState(false);
  const [isViewedPage, setIsViewedPage] = useState(false);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favoritesNotices = useSelector(selectFavoritesNotices) || [];

  const [isFavorite, setIsFavorite] = useState(
    favoritesNotices.find((favorite) => favorite._id === _id)
  );

  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";

  useEffect(() => {
    if (isProfilePage) {
      setIsViewedPage(true);
    } else {
      setIsViewedPage(false);
    }
  }, [isProfilePage]);

  useEffect(() => {
    setIsFavorite(favoritesNotices.find((favorite) => favorite._id === _id));
  }, [_id, favoritesNotices]);

  useEffect(() => {
    if (showNoticeModal && !isViewedPage) {
      dispatch(getOneNotice(_id));
    }
  }, [dispatch, _id, isViewedPage, showNoticeModal]);

  const handleLearnMore = () => {
    if (!isLoggedIn) {
      setShowAttentionModal(true);
    } else {
      setShowNoticeModal(true);
    }
  };

  const handleFavoriteClick = async () => {
    if (!isLoggedIn) {
      setShowAttentionModal(true);
    } else {
      try {
        if (isFavorite) {
          await dispatch(deleteNotice(_id));
          setIsFavorite(false);
        } else {
          if (favoritesNotices?.length === 0) {
            setShowFirstNotice(true);
          }
          await dispatch(addNotice(_id));
          setIsFavorite(true);
        }

        dispatch(refreshUser());
      } catch (error) {
        console.error("Error handling favorites:", error);
        toast.error("Failed to update favorites. Please try again.");
      }
    }
  };

  const closeModal = () => {
    setShowAttentionModal(false);
    setShowNoticeModal(false);
  };

  const closeModalFirstItemNotice = () => {
    setShowFirstNotice(false);
  };

  return (
    <div
      className={`${styles.container} ${
        isProfilePage ? styles.profileContainer : ""
      }`}
    >
      <div className={styles.content}>
        <img
          src={imgURL}
          alt={title}
          className={`${styles.image} ${
            isProfilePage ? styles.profileImage : ""
          }`}
        />
        <div className={styles.titleWrap}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.popularityWrap}>
            <svg width="16" height="16" fill="#FFC531">
              <use href={`${sprite}#icon-star`} />
            </svg>
            {popularity}
          </div>
        </div>

        <div
          className={`${styles.detailsWrap} ${
            isProfilePage ? styles.profileDetailsWrap : ""
          }`}
        >
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
          <p className={styles.detailsTitle}>
            Category <span>{category}</span>
          </p>
        </div>

        <p
          className={`${styles.comment} ${
            isProfilePage ? styles.profileComment : ""
          }`}
        >
          {comment}
        </p>

        <p className={styles.price}>
          {price ? `$${price.toFixed(2)}` : "Free"}
        </p>
      </div>

      <div className={styles.buttonWrap}>
        <button
          type="button"
          onClick={handleLearnMore}
          className={`${styles.buttonMore} ${
            isProfilePage ? styles.profileButtonMore : ""
          }`}
        >
          Learn more
        </button>

        {!isProfilePage && (
          <button
            type="button"
            onClick={handleFavoriteClick}
            className={styles.buttonFavorite}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            {!isLoggedIn ? (
              <svg width="18" height="18" stroke="#f6b83d" fill="none">
                <use href={`${sprite}#icon-heart`} />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                fill={isFavorite ? "#f6b83d" : "none"}
                stroke="#f6b83d"
              >
                <use href={`${sprite}#icon-heart`} />
              </svg>
            )}
          </button>
        )}
      </div>

      {showAttentionModal && <ModalAttention onClose={closeModal} />}
      {showNoticeModal && (
        <ModalNotice
          notice={notice}
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
          onClose={closeModal}
          setShowFirstNotice={setShowFirstNotice}
        />
      )}
      {showFirstNotice && (
        <ModalFirstItemNotice onClose={closeModalFirstItemNotice} />
      )}
    </div>
  );
};

export default NoticesItem;

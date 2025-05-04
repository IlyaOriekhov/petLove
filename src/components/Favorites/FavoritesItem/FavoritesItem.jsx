import { useEffect, useState } from "react";
import { formatBirthday } from "../../../utils/formatDate";
import ModalNotice from "../../Modal/ModalNotice/ModalNotice";
import sprite from "../../../assets/icons/sprite.svg";
import styles from "./FavoritesItem.module.css";

const FavoritesItem = ({ notice, onRemoveFavorites, favorites }) => {
  const [showDetails, setShowDetails] = useState(false);

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

  const [isFavorite, setIsFavorite] = useState(
    favorites?.find((favorite) => favorite._id === _id)
  );

  useEffect(() => {
    setIsFavorite(favorites?.find((favorite) => favorite._id === _id));
  }, [favorites, _id]);

  const handleRemoveFavorites = () => {
    onRemoveFavorites(_id);
  };

  const handleLearnMore = () => setShowDetails(true);

  const closeModal = () => setShowDetails(false);

  return (
    <li className={styles.container}>
      <div className={styles.content}>
        <img src={imgURL} alt={title} className={styles.image} />
        <div className={styles.titleWrap}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.popularityWrap}>
            <svg width="16" height="16" fill="#FFC531">
              <use href={`${sprite}#icon-star`} />
            </svg>
            {popularity}
          </div>
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
          <p className={styles.detailsTitle}>
            Category <span>{category}</span>
          </p>
        </div>

        <p className={styles.comment}>{comment}</p>

        <p className={styles.price}>
          {price ? `$${price.toFixed(2)}` : "Free"}
        </p>
      </div>

      <div className={styles.buttonWrap}>
        <button
          type="button"
          onClick={handleLearnMore}
          className={styles.buttonMore}
        >
          Learn more
        </button>

        <button
          type="button"
          onClick={handleRemoveFavorites}
          className={styles.buttonFavorite}
          aria-label="Remove from favorites"
        >
          <svg width="18" height="18" stroke="#f6b83d" fill="none">
            <use href={`${sprite}#icon-trash`} />
          </svg>
        </button>
      </div>

      {showDetails && (
        <ModalNotice
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
          notice={notice}
          onClose={closeModal}
        />
      )}
    </li>
  );
};

export default FavoritesItem;

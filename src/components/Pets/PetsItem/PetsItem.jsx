import { formatBirthday } from "../../../utils/formatDate";
import sprite from "../../../assets/icons/sprite.svg";
import styles from "./PetsItem.module.css";

const PetsItem = ({ pet, onDelete }) => {
  const { _id, imgURL, title, name, birthday, sex, species } = pet;

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <img src={imgURL} alt={name} className={styles.image} />
        <div className={styles.details}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.detailsItem}>
            <p className={styles.text}>
              Name <span>{name}</span>
            </p>
            <p className={styles.text}>
              Birthday <span>{formatBirthday(birthday)}</span>
            </p>
            <p className={styles.text}>
              Sex <span>{sex}</span>
            </p>
            <p className={styles.text}>
              Species <span>{species}</span>
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={styles.button}
        onClick={() => onDelete(_id)}
        aria-label="Delete pet"
      >
        <svg width="16" height="16" fill="none" stroke="currentColor">
          <use href={`${sprite}#icon-trash`} />
        </svg>
      </button>
    </div>
  );
};

export default PetsItem;

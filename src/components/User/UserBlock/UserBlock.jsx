import sprite from "../../../assets/icons/sprite.svg";
import styles from "./UserBlock.module.css";

const UserBlock = ({ user, setEditModalOpen }) => {
  const { name, email, phone, avatar } = user;

  return (
    <>
      {avatar ? (
        <img src={avatar} alt={name} className={styles.image} />
      ) : (
        <>
          <span className={styles.imageWrapper}>
            <svg width="40" height="40" fill="#f6b83d" stroke="#f6b83d">
              <use href={`${sprite}#icon-user`} />
            </svg>
          </span>
          <button
            type="button"
            className={styles.uploadButton}
            onClick={() => setEditModalOpen(true)}
          >
            Upload photo
          </button>
        </>
      )}

      <h2 className={styles.title}>My information</h2>
      <ul className={styles.infoList}>
        <li className={styles.infoItem}>
          <p>{name}</p>
        </li>
        <li className={styles.infoItem}>
          <p>{email}</p>
        </li>
        <li className={styles.infoItem}>
          <p>{phone || "+380"}</p>
        </li>
      </ul>
    </>
  );
};

export default UserBlock;

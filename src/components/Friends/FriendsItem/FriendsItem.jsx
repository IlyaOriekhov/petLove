
import styles from "./FriendsItem.module.css";

const FriendsItem = ({
  address,
  addressUrl,
  imageUrl,
  url,
  email,
  phone,
  title,
  workDays,
}) => {
  return (
    <div className={styles.friendsItemWrap}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={imageUrl} alt={title} className={styles.img} />
      </a>
      <div className={styles.infoContainer}>
        <h3 className={styles.title}>{title}</h3>

        <p className={styles.text}>
          <span>Email: </span>
          {email ? (
            <a
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {email}
            </a>
          ) : (
            "website only"
          )}
        </p>

        <p className={styles.text}>
          <span>Address: </span>
          {address ? (
            <a
              href={addressUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {address}
            </a>
          ) : (
            "website only"
          )}
        </p>

        <p className={styles.text}>
          <span>Phone: </span>
          {phone ? (
            <a
              href={`tel:${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {phone}
            </a>
          ) : (
            "email only"
          )}
        </p>
      </div>

      <div className={styles.details}>
        {workDays && workDays.length > 0 ? (
          <div>
            {workDays[0].isOpen ? (
              <p>
                {workDays[0].from} - {workDays[0].to}
              </p>
            ) : (
              <p>Closed</p>
            )}
          </div>
        ) : (
          <p>Day and night</p>
        )}
      </div>
    </div>
  );
};

export default FriendsItem;

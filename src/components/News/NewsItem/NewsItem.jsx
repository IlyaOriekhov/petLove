import { formatDate } from "../../../utils/formatDate";
import styles from "./NewsItem.module.css";

const NewsItem = ({ news }) => {
  const { imgUrl, title, text, date, url } = news;

  return (
    <div className={styles.newsItemWrap}>
      <img src={imgUrl} alt={title} className={styles.img} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
      <div className={styles.detail}>
        <p className={styles.date}>{formatDate(date)}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsItem;

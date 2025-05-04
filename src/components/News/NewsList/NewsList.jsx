import NewsItem from "../NewsItem/NewsItem";
import styles from "./NewsList.module.css";

const NewsList = ({ news }) => {
  if (!news || news.length === 0) {
    return (
      <div className={styles.emptyList}>
        <p>No news found</p>
      </div>
    );
  }

  return (
    <div className={styles.newsListWrap}>
      {news.map((item) => (
        <NewsItem key={item._id} news={item} />
      ))}
    </div>
  );
};

export default NewsList;

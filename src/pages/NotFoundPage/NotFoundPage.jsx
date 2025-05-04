import { Link } from "react-router-dom";
import notFound from "../../assets/images/notfound_tab.png";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.numberWrap}>
        <p className={styles.number}>4</p>
        <picture className={styles.picture}>
          <source srcSet={`${notFound}`} />
          <img src={notFound} alt="cat" className={styles.image} />
        </picture>
        <p className={styles.number}>4</p>
      </div>

      <p className={styles.text}>Ooops! This page not found :(</p>
      <Link to="/" className={styles.link}>
        To home page
      </Link>
    </div>
  );
};

export default NotFoundPage;

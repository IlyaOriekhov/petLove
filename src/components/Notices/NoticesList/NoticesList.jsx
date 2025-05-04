import NoticesItem from "../NoticesItem/NoticesItem";
import styles from "./NoticesList.module.css";

const NoticesList = ({ notices }) => {
  if (!notices || notices.length === 0) {
    return (
      <div className={styles.emptyList}>
        <p>No notices found</p>
      </div>
    );
  }

  return (
    <div className={styles.noticesListWrap}>
      {notices.map((notice) => (
        <NoticesItem key={notice._id} notice={notice} />
      ))}
    </div>
  );
};

export default NoticesList;

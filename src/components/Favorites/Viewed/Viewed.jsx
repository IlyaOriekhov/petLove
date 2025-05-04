import { useSelector } from "react-redux";
import { selectViewedNotices } from "../../../redux/auth/selectors";
import NoticesItem from "../../Notices/NoticesItem/NoticesItem";
import styles from "./Viewed.module.css";

const Viewed = () => {
  const viewedNotices = useSelector(selectViewedNotices) || [];

  if (viewedNotices.length === 0) {
    return (
      <div className={styles.emptyList}>
        <p>
          You haven't viewed any pets yet. Visit the "Find pet" page to browse
          available pets.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {viewedNotices.map((notice) => (
        <NoticesItem key={notice._id} notice={notice} />
      ))}
    </div>
  );
};

export default Viewed;

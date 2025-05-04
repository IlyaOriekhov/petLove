import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../../../redux/auth/operations";
import { deleteNotice } from "../../../redux/notices/operations";
import { selectFavoritesNotices } from "../../../redux/auth/selectors";
import FavoritesItem from "../FavoritesItem/FavoritesItem";
import styles from "./FavoritePets.module.css";

const FavoritePets = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoritesNotices);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const handleRemoveFavorites = (id) => {
    dispatch(deleteNotice(id));
    setTimeout(() => {
      dispatch(refreshUser());
    }, 300);
  };

  if (!favorites || favorites.length === 0) {
    return (
      <div className={styles.emptyList}>
        <p>
          Oops, <span>looks like there aren't any furries</span> on our adorable
          page yet. Do not worry! View your pets on the "find your favorite pet"
          page and add them to your favorites.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {favorites.map((notice) => (
        <FavoritesItem
          key={notice._id}
          notice={notice}
          onRemoveFavorites={handleRemoveFavorites}
          favorites={favorites}
        />
      ))}
    </div>
  );
};

export default FavoritePets;

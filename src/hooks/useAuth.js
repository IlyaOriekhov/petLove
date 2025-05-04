import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUser,
  selectIsRefreshing,
  selectUserPets,
  selectFavoritesNotices,
  selectViewedNotices,
  selectIsLoading,
  selectError,
} from "../redux/auth/selectors";

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const isRefreshing = useSelector(selectIsRefreshing);
  const pets = useSelector(selectUserPets);
  const favorites = useSelector(selectFavoritesNotices);
  const viewed = useSelector(selectViewedNotices);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return {
    isLoggedIn,
    user,
    isRefreshing,
    pets,
    favorites,
    viewed,
    isLoading,
    error,
  };
};

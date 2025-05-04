import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../../redux/auth/operations";
import { selectUser, selectIsLoading } from "../../redux/auth/selectors";
import UserCard from "../../components/User/UserCard/UserCard";
import MyNotices from "../../components/Notices/MyNotices/MyNotices";
import MiniLoader from "../../components/Shared/MiniLoader/MiniLoader";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isLoading) {
    return <MiniLoader />;
  }

  return (
    <div className={styles.container}>
      <UserCard user={user} />
      <MyNotices />
    </div>
  );
};

export default ProfilePage;

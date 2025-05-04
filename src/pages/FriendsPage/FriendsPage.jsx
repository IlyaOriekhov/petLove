import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../../redux/friends/operations";
import { selectFriends } from "../../redux/friends/selectors";
import Title from "../../components/Shared/Title/Title";
import FriendsList from "../../components/Friends/FriendsList/FriendsList";
import styles from "./FriendsPage.module.css";

const FriendsPage = () => {
  const dispatch = useDispatch();
  const friends = useSelector(selectFriends);

  useEffect(() => {
    dispatch(getFriends());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Title text="Our friends" />

      <FriendsList friends={friends} />
    </div>
  );
};

export default FriendsPage;

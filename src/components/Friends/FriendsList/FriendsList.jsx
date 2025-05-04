import FriendsItem from "../FriendsItem/FriendsItem";
import styles from "./FriendsList.module.css";

const FriendsList = ({ friends }) => {
  if (!friends || friends.length === 0) {
    return (
      <div className={styles.emptyList}>
        <p>No partners found</p>
      </div>
    );
  }

  return (
    <div className={styles.friendsListContainer}>
      {friends.map((friend) => (
        <FriendsItem key={friend._id} {...friend} />
      ))}
    </div>
  );
};

export default FriendsList;

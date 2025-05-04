import { useState } from "react";
import FavoritePets from "../../Favorites/FavoritePets/FavoritePets";
import Viewed from "../../Favorites/Viewed/Viewed";
import styles from "./MyNotices.module.css";

const MyNotices = () => {
  const [activeTab, setActiveTab] = useState("favoritePets");

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button
          type="button"
          onClick={() => setActiveTab("favoritePets")}
          className={`${styles.tabButton} ${
            activeTab === "favoritePets" ? styles.activeTabButton : ""
          }`}
        >
          My favorite pets
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("viewed")}
          className={`${styles.tabButton} ${
            activeTab === "viewed" ? styles.activeTabButton : ""
          }`}
        >
          Viewed
        </button>
      </div>

      {activeTab === "favoritePets" && <FavoritePets />}
      {activeTab === "viewed" && <Viewed />}
    </div>
  );
};

export default MyNotices;

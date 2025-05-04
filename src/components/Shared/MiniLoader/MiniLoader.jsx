import React from "react";
import { ClipLoader } from "react-spinners";
import styles from "./MiniLoader.module.css";

const Loader = () => {
  return (
    <div className={styles.backdrop}>
      <ClipLoader size={50} color="#f6b83d" />
    </div>
  );
};

export default Loader;

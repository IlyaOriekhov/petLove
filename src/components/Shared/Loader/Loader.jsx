import { useEffect, useState } from "react";
import loaderMob from "../../../assets/images/main_mob.png";
import loaderTab from "../../../assets/images/main_tab.png";
import loaderDesk from "../../../assets/images/main_desk.png";
import styles from "./Loader.module.css";

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowLogo(false);
    }, 1000);

    const progressTimer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 50);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <div className={styles.container}>
      <picture>
        <source
          srcSet={`${loaderMob}`}
          media="(max-width: 767px)"
          width={375}
        />
        <source
          srcSet={`${loaderTab}`}
          media="(min-width: 768px) and (max-width: 1279px)"
          width={768}
        />
        <source
          srcSet={`${loaderDesk}`}
          media="(min-width: 1280px)"
          width={1280}
        />
        <img src={loaderDesk} alt="loader" className={styles.image} />
      </picture>
      <div className={styles.overlay}>
        {showLogo ? (
          <div className={styles.logoContainer}>
            <p className={styles.logo}>
              petl<span className={styles.logoHeart}>❤</span>ve
            </p>
          </div>
        ) : (
          <div className={styles.progressContainer}>
            <p className={styles.progressText}>{`${Math.round(progress)}%`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loader;

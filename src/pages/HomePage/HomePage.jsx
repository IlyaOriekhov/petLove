import homeMob from "../../assets/images/home_mob.png";
import homeTab from "../../assets/images/home_tab.png";
import homeDesk from "../../assets/images/home_desk.png";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>
          Take good <span className={styles.titleSpan}>care</span> of your small
          pets
        </h1>
        <p className={styles.text}>
          Choosing a pet for your home is a choice that is meant to enrich your
          life with immeasurable joy and tenderness.
        </p>
      </div>

      <picture>
        <source srcSet={`${homeMob}`} media="(max-width: 767px)" width={335} />
        <source
          srcSet={`${homeTab}`}
          media="(min-width: 768px) and (max-width: 1279px)"
          width={704}
        />
        <source
          srcSet={`${homeDesk}`}
          media="(min-width: 1280px)"
          width={1216}
        />
        <img src={homeDesk} alt="girl with dog" className={styles.image} />
      </picture>
    </div>
  );
};

export default HomePage;

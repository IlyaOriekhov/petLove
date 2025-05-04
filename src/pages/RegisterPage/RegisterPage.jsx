import { Link } from "react-router-dom";
import Title from "../../components/Shared/Title/Title";
import RegistrationForm from "../../components/Auth/RegistrationForm/RegistrationForm";
import PetBlock from "../../components/Shared/PetBlock/PetBlock";
import registerMob from "../../assets/images/register_mob.png";
import registerTab from "../../assets/images/register_tab.png";
import registerDesk from "../../assets/images/register_desk.png";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const sources = [
    {
      srcSet: `${registerMob}`,
      media: "(max-width: 767px)",
      width: 334,
    },
    {
      srcSet: `${registerTab}`,
      media: "(min-width: 768px) and (max-width: 1279px)",
      width: 704,
    },
    {
      srcSet: `${registerDesk}`,
      media: "(min-width: 1280px)",
      width: 592,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <PetBlock sources={sources} defaultSrc={registerDesk} alt="cat" />
      <div className={styles.container}>
        <Title text="Registration" />
        <p className={styles.text}>
          Thank you for your interest in our platform.
        </p>
        <RegistrationForm />
        <p className={styles.linkText}>
          Already have an account?{" "}
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

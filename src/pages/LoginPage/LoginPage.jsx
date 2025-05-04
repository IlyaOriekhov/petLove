import { Link } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm/LoginForm";
import Title from "../../components/Shared/Title/Title";
import PetBlock from "../../components/Shared/PetBlock/PetBlock";
import loginImage from "../../assets/images/login_mob.png";
import loginImageTab from "../../assets/images/login_tab.png";
import loginImageDesk from "../../assets/images/login_desk.png";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const sources = [
    {
      srcSet: `${loginImage}`,
      media: "(max-width: 767px)",
      width: 335,
    },
    {
      srcSet: `${loginImageTab}`,
      media: "(min-width: 768px) and (max-width: 1279px)",
      width: 704,
    },
    {
      srcSet: `${loginImageDesk}`,
      media: "(min-width: 1280px)",
      width: 592,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <PetBlock sources={sources} defaultSrc={loginImageDesk} alt="dog" />
      <div className={styles.container}>
        <Title text="Log in" />
        <p className={styles.text}>
          Welcome! Please enter your credentials to login to the platform:
        </p>
        <LoginForm />
        <p className={styles.linkText}>
          Don't have an account?{" "}
          <Link to="/register" className={styles.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

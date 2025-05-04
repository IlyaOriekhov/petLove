import { useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/auth/selectors";
import AddPetForm from "../../components/Pets/AddPetForm/AddPetForm";
import PetBlock from "../../components/Shared/PetBlock/PetBlock";
import MiniLoader from "../../components/Shared/MiniLoader/MiniLoader";
import addPetMob from "../../assets/images/addpet_mob.png";
import addPetTab from "../../assets/images/addpet_tab.png";
import addPetDesk from "../../assets/images/addpet_desk.png";
import styles from "./AddPetPage.module.css";

const AddPetPage = () => {
  const isLoading = useSelector(selectIsLoading);

  if (isLoading) {
    return <MiniLoader />;
  }

  const sources = [
    {
      srcSet: `${addPetMob}`,
      media: "(max-width: 767px)",
      width: 335,
    },
    {
      srcSet: `${addPetTab}`,
      media: "(min-width: 768px) and (max-width: 1279px)",
      width: 704,
    },
    {
      srcSet: `${addPetDesk}`,
      media: "(min-width: 1280px)",
      width: 592,
    },
  ];

  return (
    <div className={styles.container}>
      <PetBlock
        sources={sources}
        defaultSrc={addPetDesk}
        alt="Dog with glasses"
      />
      <AddPetForm />
    </div>
  );
};

export default AddPetPage;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserPets } from "../../../redux/auth/selectors";
import { refreshUser, removePet } from "../../../redux/auth/operations";
import sprite from "../../../assets/icons/sprite.svg";
import PetsList from "../PetsList/PetsList";
import styles from "./PetsBlock.module.css";

const PetsBlock = () => {
  const dispatch = useDispatch();
  const pets = useSelector(selectUserPets);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const handleDeletePet = (petId) => {
    dispatch(removePet(petId));
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleWrap}>
        <h2 className={styles.title}>My pets</h2>
        <Link to="/add-pet" className={styles.addPetLink}>
          <span>Add pet</span>
          <svg width="18" height="18" fill="#FFFFFF" stroke="#FFFFFF">
            <use href={`${sprite}#icon-plus`} />
          </svg>
        </Link>
      </div>

      <PetsList pets={pets} onDelete={handleDeletePet} />
    </div>
  );
};

export default PetsBlock;

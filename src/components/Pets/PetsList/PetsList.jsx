import PetsItem from "../PetsItem/PetsItem";
import styles from "./PetsList.module.css";

const PetsList = ({ pets, onDelete }) => {
  if (!pets || pets.length === 0) {
    return (
      <div className={styles.emptyList}>
        <p>You don't have any pets yet. Add your first pet!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {pets.map((pet) => (
        <PetsItem key={pet._id} pet={pet} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default PetsList;

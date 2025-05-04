import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/auth/operations";
import sprite from "../../../assets/icons/sprite.svg";
import ModalApproveAction from "../../Modal/ModalApproveAction/ModalApproveAction";
import ModalEditUser from "../../Modal/ModalEditUser/ModalEditUser";
import UserBlock from "../UserBlock/UserBlock";
import PetsBlock from "../../Pets/PetsBlock/PetsBlock";
import styles from "./UserCard.module.css";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  const handleEditClick = () => setEditModalOpen(true);
  const handleLogoutClick = () => setLogoutModalOpen(true);

  const closeModal = () => {
    setLogoutModalOpen(false);
    setEditModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardLogo}>
        <p>User</p>
        <svg width="18" height="18">
          <use href={`${sprite}#icon-user`} />
        </svg>
      </div>

      <button
        type="button"
        className={styles.editUserBtn}
        onClick={handleEditClick}
        aria-label="Edit user profile"
      >
        <svg width="18" height="18">
          <use href={`${sprite}#icon-edit`} />
        </svg>
      </button>

      <UserBlock user={user} setEditModalOpen={setEditModalOpen} />
      <PetsBlock />

      <button
        type="button"
        className={styles.logoutBtn}
        onClick={handleLogoutClick}
      >
        Log out
      </button>

      {isEditModalOpen && (
        <ModalEditUser
          user={user}
          imageURL={imageURL}
          setImageURL={setImageURL}
          onClose={closeModal}
        />
      )}

      {isLogoutModalOpen && (
        <ModalApproveAction
          onClose={closeModal}
          onConfirm={handleLogout}
          message="Already leaving?"
          confirmText="Yes"
          cancelText="Cancel"
        />
      )}
    </div>
  );
};

export default UserCard;

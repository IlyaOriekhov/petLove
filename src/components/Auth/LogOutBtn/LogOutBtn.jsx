import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/auth/operations";
import ModalApproveAction from "../../Modal/ModalApproveAction/ModalApproveAction";
import styles from "./LogOutBtn.module.css";

const LogOutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    await dispatch(logout());

    closeModal();

    navigate("/");

    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  return (
    <div className={styles.buttonWrap}>
      <button className={styles.button} onClick={openModal}>
        Log out
      </button>
      {isModalOpen && (
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

export default LogOutBtn;

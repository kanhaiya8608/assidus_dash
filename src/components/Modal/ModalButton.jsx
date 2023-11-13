// ModalButton.js
import React, { useState } from "react";
import Modal from "./Modal";

function ModalButton() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
}

export default ModalButton;

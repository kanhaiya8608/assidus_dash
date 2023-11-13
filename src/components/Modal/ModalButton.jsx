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
      <button className=" bg-blue-100 text-green-500 font-bold p-2 px-4 rounded-md" onClick={openModal}>New Sales Invoice</button>
      <Modal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
}

export default ModalButton;

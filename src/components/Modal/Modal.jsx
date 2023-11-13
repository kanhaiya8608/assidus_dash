// Modal.js
import React from "react";
import { FaTimes } from "react-icons/fa"; // Import the close icon from react-icons
import "./Modal.css"; // Add your modal styles here

function Modal({ isOpen, onClose }) {
  return (
    <div className={`modalBackground ${isOpen ? "open" : ""}`}>
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={onClose}>
            <FaTimes /> {/* Use the close icon */}
          </button>
        </div>
        <div className="title">
          <h1>Modal Title</h1>
        </div>
        <div className="body">
          <p>This is the modal content.</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;

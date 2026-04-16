import React from "react";
import "../../css/common/Modal.css";

const Modal = ({ children, onClose }) => {
  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          className="modal-close"
          aria-label="Close modal"
          onClick={onClose}
        >
          ×
        </button>

        {/* Modal body */}
        {children}
      </div>
    </div>
  );
};

export default Modal;

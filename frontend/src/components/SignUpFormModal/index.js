import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignUpForm from "./SignUpForm";

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <a onClick={() => setShowModal(true)}>Sign Up</a>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;

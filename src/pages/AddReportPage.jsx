import React, { useState } from "react";
import Modal from "../components/addReportComponents/Modal";

const AddReportPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <section className="dark">
      {isModalOpen && <Modal toggleModal={toggleModal} />}
      <button
        onClick={toggleModal}
        className="text-white bg-blue-700 px-4 py-2 rounded-md"
      >
        Open Modal
      </button>
    </section>
  );
};

export default AddReportPage;

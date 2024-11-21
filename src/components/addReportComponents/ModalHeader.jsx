import React from "react";

const ModalHeader = ({ toggleModal }) => {
  return (
    <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-700 rounded-t">
      <h3 className="font-semibold text-textPrimary text-2xl">Add a Report</h3>
      <button
        type="button"
        onClick={toggleModal}
        className="text-gray-400 bg-transparent hover:bg-gray-700 hover:text-white rounded-lg text-sm w-8 h-8 flex items-center justify-center"
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1l6 6m0 0l6 6M7 7L1 13M7 7l6-6"
          />
        </svg>
        <span className="sr-only">Close modal</span>
      </button>
    </div>
  );
};

export default ModalHeader;

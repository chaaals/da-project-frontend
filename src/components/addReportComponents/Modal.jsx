import React, { useState } from "react";
import ModalHeader from "./ModalHeader";
import ModalGrid from "./ModalGrid";
import ModalForm from "./ModalForm";
import AskBytes from "./AskBytes";
import Preview from "./Preview";
import { useQuery } from "@tanstack/react-query";
import { getColumns } from "../../queries/column";
import Spinner from "../Spinner";

const Modal = ({ report, toggleModal, onAddReport }) => {
  const [selectedChart, setSelectedChart] = useState(null); // Track selected chart

  const {
    isLoading,
    isFetching,
    data: columns,
  } = useQuery({
    queryKey: ["columns"],
    queryFn: () => getColumns(report.id),
  });

  console.log({ columns });

  return (
    <div
      id="crud-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-50"
    >
      <div className="relative p-6 w-full max-w-4xl max-h-[90vh] overflow-auto bg-gray-800 rounded-lg shadow-lg dark:bg-gray-900">
        <ModalHeader toggleModal={toggleModal} />
        <ModalGrid setSelectedChart={setSelectedChart} /> {/* Pass setter */}
        {isLoading || (isFetching && <Spinner />)}
        {!isLoading && !isFetching && (
          <ModalForm selectedChart={selectedChart} columns={columns} />
        )}
        <Preview />
        <AskBytes />
        <div className="flex justify-end mt-4">
          <button
            onClick={onAddReport} // Trigger add report
            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

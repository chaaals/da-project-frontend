import React from "react";

const ModalForm = ({ selectedChart }) => {
  return (
    <form className="p-5 md:p-2">
      {selectedChart === "Circle" || selectedChart === "Donut" ? (
        // Specific form for Circle Chart
        <div className="col-span-2">
          <label
            htmlFor="data-field"
            className="block mb-2 text-sm font-medium text-textPrimary"
          >
            Select a Data Field
          </label>
          <select
            id="data-field"
            className="bg-gray-700 border border-gray-600 text-textPrimary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Choose Field</option>
            <option value="YearLevel">Year Level</option>
            <option value="Gender">Gender</option>
            <option value="Age">Age</option>
            <option value="Degree">Degree Program</option>
          </select>
        </div>
      ) : (
        // Default form for other chart types
        <div className="grid gap-4 mb-2 grid-cols-2">
          <div className="col-span-2">
            <label
              htmlFor="x-axis"
              className="block mb-2 text-sm font-medium text-textPrimary"
            >
              Select X-Axis
            </label>
            <select
              id="X-axis"
              className="bg-gray-700 border border-gray-600 text-textPrimary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option>Select Data Field</option>
              <option value="YearLevel">Year Level</option>
              <option value="Gender">Gender</option>
              <option value="Age">Age</option>
              <option value="Degree">Degree Program</option>
            </select>
          </div>
          <div className="col-span-2 mb-5">
            <label
              htmlFor="y-axis"
              className="block mb-2 text-sm font-medium text-textPrimary"
            >
              Select Y-Axis
            </label>
            <select
              id="y-axis"
              className="bg-gray-700 border border-gray-600 text-textPrimary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option>Select Data Field</option>
              <option value="YearLevel">Year Level</option>
              <option value="Gender">Gender</option>
              <option value="Age">Age</option>
              <option value="Degree">Degree Program</option>
            </select>
          </div>
        </div>
      )}
    </form>
  );
};

export default ModalForm;

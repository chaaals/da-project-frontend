import { useState } from "react";

const ModalForm = ({ selectedChart, columns }) => {
  const isValidColumn = !selectedChart;

  return (
    <form className="p-5 md:p-2">
      <section className="grid grid-cols-3 gap-4">
        {columns.map((column, i) => {
          return (
            <div key={i} className="flex items-center">
              <input
                id={`${column.label}-${i}`}
                type="checkbox"
                checked={true}
                onChange={() => console.log("lol")}
                disabled={isValidColumn}
                className="mr-2 h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor={`${column.label}-${i}`}>{column.label}</label>
            </div>
          );
        })}
      </section>
    </form>
  );
};

export default ModalForm;

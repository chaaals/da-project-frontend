import { rules } from "./rules";

const CARTESIAN_DATA_INPUT = ({ columns, selectedChart, setChartData }) => {
  const options = columns.filter(
    (column) =>
      rules[selectedChart].dataTypes.some(
        (colType) => column.column_type === colType
      ) && rules[selectedChart].type === "cartesian"
  );

  const onSelect = (event) => {
    const { name, value } = event.target;

    setChartData((prev) => ({
      ...prev,
      [name]:
        value !== "0"
          ? columns.filter((col) => col.label === value)
          : undefined,
    }));
  };

  return (
    <section className="w-full grid gap-4 mb-2 grid-cols-2">
      <div>
        <label
          htmlFor="cartesian-input-x"
          className="block mb-2 text-sm font-medium text-textPrimary"
        >
          X Axis
        </label>
        <select
          id="cartesian-input-x"
          name="x"
          className="bg-gray-700 border border-gray-600 text-textPrimary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={onSelect}
        >
          <option value={0}>Select X Axis</option>
          {options.map((opt, i) => (
            <option key={`${opt.label}-${i}`} value={opt.label}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="cartesian-input-y"
          className="block mb-2 text-sm font-medium text-textPrimary"
        >
          Y Axis
        </label>
        <select
          id="cartesian-input-y"
          name="y"
          className="bg-gray-700 border border-gray-600 text-textPrimary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={onSelect}
        >
          <option value={undefined}>Select Y Axis</option>
          {options.map((opt, i) => (
            <option key={`${opt.label}-${i}`} value={opt.label}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

const CATEGORICAL_DATA_INPUT = ({
  columns,
  selectedChart,
  chartData,
  setChartData,
}) => {
  const options = columns.filter(
    (column) =>
      rules[selectedChart].dataTypes.some(
        (colType) => column.column_type === colType
      ) && rules[selectedChart].type === "categorical"
  );

  const onSelect = (event) => {
    const { name, value } = event.target;

    setChartData((prev) => ({
      ...prev,
      [name]: columns.filter((col) => col.label === value),
    }));
  };

  const onToggleCheck = (column) => {
    setChartData((prev) => {
      const { data } = prev;
      const isExisting = data.some((col) => col.label === column.label);

      if (isExisting) {
        return { data: data.filter((col) => col.label !== column.label) };
      }

      return { data: [...data, column] };
    });
  };

  return (
    <section>
      {selectedChart === "funnel" && (
        <>
          <h2 className="block mb-2 text-sm font-medium text-textPrimary">
            Chart Data
          </h2>
          <section className="w-full grid gap-4 mb-2 grid-cols-3">
            {options.map((opt, i) => (
              <div
                key={`${opt.label}-${i}`}
                className="flex gap-2 items-center"
              >
                <input
                  id={`${opt.label}-${i}`}
                  className="mr-2 h-4 w-4 text-blue-600 rounded"
                  type="checkbox"
                  onChange={() => onToggleCheck(opt)}
                  checked={chartData?.data?.some(
                    (col) => col.label === opt.label
                  )}
                />
                <label
                  htmlFor={`${opt.label}-${i}`}
                  className="text-textPrimary"
                >
                  {opt.label}
                </label>
              </div>
            ))}
          </section>
        </>
      )}

      {selectedChart === "pie" && (
        <>
          <label
            htmlFor="categorical-input"
            className="block mb-2 text-sm font-medium text-textPrimary"
          >
            Chart Data
          </label>
          <select
            id="categorical-input"
            name="data"
            className="bg-gray-700 border border-gray-600 text-textPrimary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={onSelect}
          >
            <option>Select Data Source</option>
            {options.map((opt, i) => (
              <option key={`${opt.label}-${i}`} value={opt.label}>
                {opt.label}
              </option>
            ))}
          </select>
        </>
      )}
    </section>
  );
};

const ModalForm = ({ columns, selectedChart, chartData, setChartData }) => {
  return (
    <>
      {selectedChart && (
        <form className="p-5 md:p-2">
          {rules[selectedChart].type === "cartesian" && (
            <CARTESIAN_DATA_INPUT
              columns={columns}
              selectedChart={selectedChart}
              setChartData={setChartData}
            />
          )}
          {rules[selectedChart].type === "categorical" && (
            <CATEGORICAL_DATA_INPUT
              columns={columns}
              selectedChart={selectedChart}
              chartData={chartData}
              setChartData={setChartData}
            />
          )}
        </form>
      )}
    </>
  );
};

export default ModalForm;

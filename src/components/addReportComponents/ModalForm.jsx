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
          <option value={0}>Select Y Axis</option>
          {options.map((opt, i) => (
            <option key={`${opt.label}-${i}`} value={opt.label}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {selectedChart === "bubble" && (
        <div>
          <label
            htmlFor="cartesian-input-r"
            className="block mb-2 text-sm font-medium text-textPrimary"
          >
            R Value (Bubble Size)
          </label>
          <select
            id="cartesian-input-r"
            name="r"
            className="bg-gray-700 border border-gray-600 text-textPrimary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={onSelect}
          >
            <option value={0}>Select Bubble Radius</option>
            {options.map((opt, i) => (
              <option key={`${opt.label}-${i}`} value={opt.label}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </section>
  );
};

const CATEGORICAL_DATA_INPUT = ({ columns, selectedChart, setChartData }) => {
  const options = columns.filter(
    (column) =>
      rules[selectedChart].dataTypes.some(
        (colType) => column.column_type === colType
      ) && rules[selectedChart].type === "categorical"
  );

  const onSelect = (event) => {
    const { name, value } = event.target;
    console.log({ value });
    setChartData((prev) => ({
      ...prev,
      [name]:
        value !== "0"
          ? columns.filter((col) => col.label === value)
          : undefined,
    }));
  };

  return (
    <>
      {selectedChart === "pie" || selectedChart === "funnel" ? (
        <section>
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
              <option value={0}>Select Data Source</option>
              {options.map((opt, i) => (
                <option key={`${opt.label}-${i}`} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
          </>
        </section>
      ) : (
        <section className="w-full grid gap-4 mb-2 grid-cols-2">
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-textPrimary"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              className="bg-gray-700 border border-gray-600 text-textPrimary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={onSelect}
            >
              <option value={0}>Select Category</option>
              {options.map((opt, i) => (
                <option key={`${opt.label}-${i}`} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="col1"
              className="block mb-2 text-sm font-medium text-textPrimary"
            >
              Column 1
            </label>
            <select
              id="col1"
              name="col1"
              className="bg-gray-700 border border-gray-600 text-textPrimary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={onSelect}
            >
              <option value={0}>Select Column 1</option>
              {options
                .filter(
                  ({ column_type }) =>
                    column_type === "NUMBER" || column_type === "BOOLEAN"
                )
                .map((opt, i) => (
                  <option key={`${opt.label}-${i}`} value={opt.label}>
                    {opt.label}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="col2"
              className="block mb-2 text-sm font-medium text-textPrimary"
            >
              Column 2
            </label>
            <select
              id="col2"
              name="col2"
              className="bg-gray-700 border border-gray-600 text-textPrimary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={onSelect}
            >
              <option value={0}>Select Column 2</option>
              {options
                .filter(
                  ({ column_type }) =>
                    column_type === "NUMBER" || column_type === "BOOLEAN"
                )
                .map((opt, i) => (
                  <option key={`${opt.label}-${i}`} value={opt.label}>
                    {opt.label}
                  </option>
                ))}
            </select>
          </div>
        </section>
      )}
    </>
  );
};

const ModalForm = ({ columns, selectedChart, chartData, setChartData }) => {
  const onChange = (event) => {
    const { name, value } = event.target;

    setChartData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {selectedChart && (
        <form className="p-5 md:p-2">
          <section className="mb-4">
            <label
              htmlFor="chart-title"
              className="block mb-2 text-sm font-medium text-textPrimary"
            >
              Chart Title
            </label>
            <input
              id="chart-title"
              name="title"
              placeholder="Enter Chart Title..."
              className="bg-gray-700 border border-gray-600 text-textPrimary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={onChange}
            />
          </section>
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

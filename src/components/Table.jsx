const Table = ({ tableData }) => {
  const [headers, ...data] = tableData;

  return (
    <div className="max-h-96 relative overflow-x-auto shadow-md">
      <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-textPrimary uppercase bg-gray-50">
          <tr>
            {headers.map((col, i) => (
              <th
                key={`${col}-${i}`}
                scope="col"
                className="font-bold bg-tableHeader p-3"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => {
            return (
              <tr
                key={`${row}-${i}`}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {row.map((data, j) => {
                  return (
                    <td
                      key={`${data}-${j}`}
                      scope="row"
                      className="bg-tableData border-b border-tableHeader p-3 font-medium text-textSecondary whitespace-nowrap"
                    >
                      {data}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

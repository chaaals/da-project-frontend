import { parse } from "papaparse";
import { useEffect, useState } from "react";

const useTable = ({ csvUpload, columns }) => {
  const [tableData, setTableData] = useState([]);

  const parseFetchedTable = (columns) => {
    if (!columns) return;

    const table = columns.reduce((table, column) => {
      const { label, rows } = column;

      if (!table[0]) {
        table.push([]);
      }

      table[0].push(label);
      console.log({ table });

      rows.forEach((row, i) => {
        if (!table[i + 1]) {
          table.push([]);
        }

        table[i + 1].push(row);
      });

      return table;
    }, []);

    setTableData(table);
  };

  useEffect(() => {
    if (csvUpload) {
      parse(csvUpload, {
        complete: (results) => setTableData(results.data),
      });
    }

    if (columns) {
      parseFetchedTable(columns);
    }
  }, [csvUpload, columns]);

  return { tableData, parseFetchedTable };
};

export default useTable;

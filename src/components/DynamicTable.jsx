import React, { useState } from "react";
import Button from "./Button";

const DynamicTable = ({ columns, data, rowsPerPage = 5, isPaginationHidden = false }) => {
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / rowsPerPage);

    // Helper functions
    const formatHeader = (header) => header.replace(/_/g, " ");

    // Calculate the data for the current page
    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return data.slice(startIndex, endIndex);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <section className="w-full overflow-auto">
                <table className="min-w-[1200px] w-full border-collapse table-fixed text-center text-textPrimary">
                    <thead>
                        <tr className="font-inter font-bold">
                            {columns.map((column, index) => (
                                <th key={index} className="bg-tableHeader py-2">
                                    {formatHeader(column)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="font-inter text-center">
                        {getPaginatedData().map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className="bg-tableData border-b border-tableHeader py-2"
                                    >
                                        {row[column] || row[column.toLowerCase()] || "N/A"}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section className={`${isPaginationHidden || totalPages === 1 ? "hidden" : "flex justify-center space-x-2 mt-4"}`}>
                <Button onClick={handlePrevPage} 
                    style={`px-3 py-1 rounded ${
                        currentPage === 1 ? "invisible" : "bg-tableData text-textPrimary"
                    }`}>
                    Prev
                </Button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <Button key={index + 1}
                        onClick={() => handlePageClick(index + 1)} 
                        style={`px-3 py-1 rounded ${
                            currentPage === index + 1
                                ? "bg-tableData text-textPrimary cursor-not-allowed"
                                : "bg-tableHeader text-textPrimary"
                        }`}>
                        {index + 1}
                    </Button>
                ))}
                
                <Button onClick={handleNextPage} 
                    style={`px-3 py-1 rounded ${
                        currentPage === totalPages ? "invisible" : "bg-tableData text-textPrimary"
                    }`}>
                    Next
                </Button>
            </section>
        </>
    );
};

export default DynamicTable;
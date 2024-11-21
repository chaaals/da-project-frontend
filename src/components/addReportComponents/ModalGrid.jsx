import React from "react";

// Icon mapping with paths to public directory
const chartIcons = {
  Column: "/images/charts/column-chart.svg",
  Circle: "/images/charts/circle-chart.svg",
  Donut: "/images/charts/donut-chart.svg",
  Area: "/images/charts/area-chart.svg",
  Line: "/images/charts/line-chart.svg",
  Combo: "/images/charts/combo-chart.svg",
  Bar: "/images/charts/bar-chart.svg",
  Geo: "/images/charts/geo-chart.svg",
};

const ModalGrid = ({ setSelectedChart }) => {
  const buttons = [
    { label: "Column Chart", type: "Column" },
    { label: "Pie Chart", type: "Circle" },
    { label: "Donut Chart", type: "Donut" },
    { label: "Area Chart", type: "Area" },
    { label: "Line Chart", type: "Line" },
    { label: "Combo Chart", type: "Combo" },
    { label: "Bar Chart", type: "Bar" },
    { label: "Geo Chart", type: "Geo" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mt-6 mb-6 px-2">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => setSelectedChart(button.type)} // Update selected chart
          className="flex flex-col items-center justify-center p-4 text-white bg-gray-700 hover:bg-gray-600 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
        >
          <img
            src={chartIcons[button.type]} // Dynamically load the icon
            alt={`${button.label} Icon`}
            className="w-6 h-6 mb-2"
          />
          <span className="text-textPrimary">{button.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ModalGrid;

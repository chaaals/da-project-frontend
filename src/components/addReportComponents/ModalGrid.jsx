import React from "react";

const chartIcons = {
  Scatter: "/images/charts/scatter-plot.svg",
  Pie: "/images/charts/pie-chart.svg",
  Bubble: "/images/charts/bubble-chart.svg",
  Funnel: "/images/charts/funnel-chart.svg",
  Geo: "/images/charts/geo-chart.svg",
};

const ModalGrid = ({ setSelectedChart }) => {
  const buttons = [
    { label: "Scatter Plot", type: "Scatter" },
    { label: "Pie Chart", type: "Pie" },
    { label: "Bubble Chart", type: "Bubble" },
    { label: "Funnel Chart", type: "Funnel" },
    { label: "Geo Chart", type: "Geo" },
  ];

  return (
    <div className="grid grid-cols-5 gap-4 my-6 px-2">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => setSelectedChart(button.type)} // Update selected chart
          className="flex flex-col items-center justify-center p-4 text-white bg-gray-700 hover:bg-gray-600 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
        >
          <img
            src={chartIcons[button.type]} // Dynamically load the icon
            alt={`${button.label} Icon`}
            className="size-6 mb-2"
          />
          <span className="text-textPrimary">{button.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ModalGrid;

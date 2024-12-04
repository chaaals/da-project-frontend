const chartIcons = {
  scatter: "/images/charts/scatter-plot.svg",
  pie: "/images/charts/pie-chart.svg",
  bubble: "/images/charts/bubble-chart.svg",
  funnel: "/images/charts/funnel-chart.svg",
  stackedbar: "/images/charts/stacked-bar.svg",
};

const ModalGrid = ({ setSelectedChart }) => {
  const buttons = [
    { label: "Scatter Plot", type: "scatter" },
    { label: "Pie Chart", type: "pie" },
    { label: "Bubble Chart", type: "bubble" },
    { label: "Funnel Chart", type: "funnel" },
    { label: "Stacked Bar Chart", type: "stacked Bar" },
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

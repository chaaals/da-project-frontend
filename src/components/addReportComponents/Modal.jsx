import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import ModalHeader from "./ModalHeader";
import ModalForm from "./ModalForm";
import Preview from "./Preview";
import Spinner from "../Spinner";

import { rules } from "./rules";
import { postPage } from "../../queries/page";

import useChart from "../../hooks/useChart";

const chartIcons = {
  scatter: "/images/charts/scatter-plot.svg",
  pie: "/images/charts/pie-chart.svg",
  bubble: "/images/charts/bubble-chart.svg",
  funnel: "/images/charts/funnel-chart.svg",
  stackedbar: "/images/charts/stacked-bar.svg",
};

const buttons = [
  { 
    label: "Scatter Plot", 
    type: "scatter", 
    tooltip: "Used to visualize relationships or correlations between two continuous variables, identifying patterns or trends." 
  },
  { 
    label: "Pie Chart", 
    type: "pie", 
    tooltip: "Illustrates proportions or percentages of a whole, dividing data into segments of a circle." 
  },
  { 
    label: "Bubble Chart", 
    type: "bubble", 
    tooltip: "Displays relationships between three variables using position and bubble size to add a dimension of comparison." },
  { 
    label: "Funnel Chart", 
    type: "funnel", 
    tooltip: "Shows progressive stages in a process, highlighting drop-offs or conversions at each stage." },
  { 
    label: "Stacked Bar Chart", 
    type: "stackedbar", 
    tooltip: "Compares parts of a whole across categories with segments stacked within each bar." 
  },
];

const CHART_DATA_TEMPLATE = {
  cartesian: {
    x: undefined,
    y: undefined,
    r: undefined,
  },
  categorical: {
    data: undefined,
    category: undefined,
    col1: undefined,
    col2: undefined,
  },
};

const Modal = ({ report, columns, toggleModal, refetch }) => {
  const [selectedChart, setSelectedChart] = useState(null);
  const [chartData, setChartData] = useState({});

  const { chart, chartEnums, getLabels } = useChart({
    selectedChart,
    chartData,
  });

  const { mutate: addReportPage, isPending: isAdding } = useMutation({
    mutationFn: postPage,
    onSuccess: () => {
      refetch();
      toggleModal();
      toast.success("Successfully created a report page.");
    },
    onError: (error) => {
      toast.error("Oops, something went wrong.");
      console.error("Oops, something went wrong.", error);
    },
  });

  const onSelectChart = (chart) => {
    setSelectedChart(chart);
    setChartData({
      title: undefined,
      ...CHART_DATA_TEMPLATE[rules[chart].type],
    });
  };

  const onAddReportPage = () => {
    const { title } = chartData;

    if (!chart || !title) {
      toast.error(
        "Title or chart data cannot be undefined when creating a report."
      );
      return;
    }

    const reportId = report.id;
    const data = {
      name: title,
      chart_type: chartEnums[selectedChart],
      labels: getLabels(chartData),
    };

    addReportPage({ reportId, data });
  };

  return (
    <section
      id="crud-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-50"
    >
      <div className="relative p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden bg-gray-800 rounded-lg shadow-lg dark:bg-gray-900">
        <ModalHeader toggleModal={toggleModal} />

        <div className="grid grid-cols-1 gap-4 my-6 px-2 desktop:grid-cols-5">
          {buttons.map((button, index) => (
            <div key={index} className="relative group">
              <button
                onClick={() => onSelectChart(button.type)}
                className={`flex flex-col items-center justify-center p-4 text-white rounded-lg shadow-md w-full h-full ${
                  selectedChart === button.type
                    ? "bg-colorSecondary"
                    : "bg-tableHeader hover:bg-colorSecondary"
                }`}
              >
                <img
                  src={chartIcons[button.type]}
                  alt={`${button.label} Icon`}
                  className="size-6 mb-2"
                />
                <span className="text-textPrimary">{button.label}</span>
              </button>
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-xs rounded-lg px-2 py-1 shadow-lg z-50 whitespace-normal w-max max-w-52">
                {button.tooltip}
              </div>

            </div>
          ))}
        </div>
        <ModalForm
          columns={columns}
          selectedChart={selectedChart}
          chartData={chartData}
          setChartData={setChartData}
        />

        {chart && <Preview>{chart}</Preview>}

        <div className="flex justify-end mt-4">
          <button
            onClick={onAddReportPage}
            className="w-32 flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isAdding && <Spinner />}
            {!isAdding && <span>Add Report</span>}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Modal;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Modal from "../components/addReportComponents/Modal";
import { getReport } from "../queries/report";
import Spinner from "../components/Spinner";
import { getPages } from "../queries/page";
import useChart from "../hooks/useChart";

const Header = ({ report }) => {
  const { name } = report;
  return (
    <section className="flex justify-between items-center p-2 bg-transparent">
      <div className="text-white text-4xl font-semibold">{name}</div>
      <button className="bg-transparent text-white border-2 border-blue-700 px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white">
        Download Reports
      </button>
    </section>
  );
};

const Tabs = ({ tabs, activeTab, setActiveTab, onAddTab }) => {
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {tabs.map((tab) => (
          <li key={tab.id} className="me-2">
            <a
              href="#"
              className={`inline-block p-4 border-b-2 ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300"
              } rounded-t-lg text-lg`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.id}
            </a>
          </li>
        ))}
        <li className="me-2">
          <button
            onClick={onAddTab}
            className="inline-block p-5 border-transparent"
          >
            <img
              src="/images/circle-plus.svg"
              alt="Add Tab"
              className="w-6 h-6"
            />
          </button>
        </li>
      </ul>
      {/* Display Content based on Active Tab */}
      <div className="p-4 mt-4">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div key={tab.id}>
                {tab.id === "Overview" ? (
                  <div className="flex flex-col items-center bg-[#1F2A37] rounded-lg shadow-md p-8">
                    <p>{tab.content}</p>
                  </div>
                ) : (
                  tab.content
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};

const ReportPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("Overview");

  const { reportId } = useParams();
  const {
    isLoading: isReportLoading,
    isFetching: isReportFetching,
    data: report,
  } = useQuery({
    queryKey: ["report"],
    queryFn: () => getReport(reportId),
  });

  const {
    isLoading: isPagesLoading,
    isFetching: isPagesFetching,
    data: reportPages,
    refetch: refetchPages,
  } = useQuery({
    queryKey: ["reportPages"],
    queryFn: () => getPages(reportId),
  });

  const { getCharts } = useChart({ selectedChart: "", chartData: {} });

  const charts = getCharts(reportPages);

  const handleAddTab = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!isReportLoading && !isReportFetching && report) {
      setTabs([{ id: "Overview", content: report.overview }]);
    }
  }, [isReportFetching, isReportLoading, report]);

  return (
    <section className="flex flex-col min-h-screen bg-transparent">
      {isReportLoading ? (
        <div className="flex items-center justify-center h-[75dvh]">
          <Spinner />
        </div>
      ) : (
        <>
          <Header report={report} />
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onAddTab={handleAddTab}
          />

          <section className="grid grid-cols-1 gap-4 p-6 desktop:grid-cols-3"></section>

          {showModal && (
            <Modal
              report={report}
              refetch={refetchPages}
              toggleModal={handleModalClose}
            />
          )}
        </>
      )}
    </section>
  );
};

export default ReportPage;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";

import Modal from "../components/addReportComponents/Modal";
import { getReport } from "../queries/report";
import Spinner from "../components/Spinner";
import Table from "../components/Table";
import CommentSection from "../components/CommentSection";
import ReportPDF from "../components/ReportPDF";

import { getColumns } from "../queries/column";
import { getPages } from "../queries/page";

import useChart from "../hooks/useChart";
import useTable from "../hooks/useTable";

const Header = ({ activeTab, report, charts }) => {
  const { name } = report;
  const [reportPdf, setReportPdf] = useState(null);

  useEffect(() => {
    if (report && charts) {
      setReportPdf(<ReportPDF report={report} data={charts} />);
    }
  }, [report, charts]);

  return (
    <section className="flex justify-between items-center p-2 bg-transparent">
      <div className="text-white text-4xl font-semibold">{name}</div>
      {activeTab === 0 && reportPdf !== null && (
        <PDFDownloadLink
          document={reportPdf}
          fileName={`${report.name} report.pdf`}
        >
          <button className="bg-transparent text-white border-2 border-blue-700 px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white">
            Download Report
          </button>
        </PDFDownloadLink>
      )}
    </section>
  );
};

const Tabs = ({ tabs, activeTab, setActiveTab, onAddTab }) => {
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px overflow-x-auto">
        {tabs.map((tab) => (
          <li key={tab.id} className="me-2">
            <button
              className={`inline-block p-4 border-b-2 ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300"
              } rounded-t-lg text-md`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.name}
            </button>
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
    </div>
  );
};

const ReportPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const { reportId } = useParams();
  const { isLoading: isReportLoading, data: report } = useQuery({
    queryKey: ["report"],
    queryFn: () => getReport(reportId),
  });

  const {
    isLoading: isColumnsLoading,
    isFetching: isColumnsFetching,
    data: columns,
  } = useQuery({
    queryKey: ["columns"],
    queryFn: () => getColumns(reportId),
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

  const { tableData } = useTable({ columns });
  const { getCharts } = useChart({ selectedChart: "", chartData: {} });

  const charts = getCharts(reportPages);

  const handleAddTab = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!isPagesLoading && !isPagesFetching && report) {
      setTabs([
        { id: 0, name: "Overview", content: report.overview },
        ...charts.map(({ id, name, overview, chart }) => ({
          id,
          overview,
          name,
          content: chart,
        })),
      ]);
    }
  }, [isPagesFetching, isPagesLoading, report]);

  return (
    <section className="flex flex-col min-h-screen bg-transparent p-8">
      {isReportLoading ? (
        <div className="flex items-center justify-center h-[75dvh]">
          <Spinner />
        </div>
      ) : (
        <>
          <Header activeTab={activeTab} report={report} charts={charts} />

          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onAddTab={handleAddTab}
          />

          <div className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400 dark:border-gray-700">
            {tabs.map(
              (tab) =>
                activeTab === tab.id && (
                  <div key={tab.id}>
                    {tab.id === 0 ? (
                      <>
                        <div className="flex items-start bg-[#1F2A37] rounded-lg shadow-md p-8 gap-4 text-wrap breawords">
                          <img
                            src="/images/logo.svg"
                            alt="PowerBytes Logo"
                            className="mt-1 size-5"
                          />
                          <p>{tab.content}</p>
                        </div>
                        <>
                          {charts && charts?.length > 0 && (
                            <div className="w-full flex items-center justify-center flex-wrap gap-4 mt-4">
                              {charts.map(({ chart }, i) => (
                                <div
                                  key={i}
                                  className="bg-white rounded-xl max-w-lg"
                                >
                                  <div className="w-full">{chart}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      </>
                    ) : (
                      <>
                        <section className="flex items-start bg-[#1F2A37] rounded-lg shadow-md p-8 gap-4 text-wrap break-words">
                          <img
                            src="/images/logo.svg"
                            alt="PowerBytes Logo"
                            className="mt-1 size-5"
                          />
                          <p>{tab.overview}</p>
                        </section>
                        <section className="flex items-center justify-center w-full">
                          <section className="flex flex-col max-w-2xl items-center mt-8 gap-2">
                            <div className="flex items-center justify-center w-full shadow bg-white p-2 rounded-lg">
                              {tab.content}
                            </div>
                            <hr className="w-full mt-4 border-[#1F2A37] desktop:w-[33.33%]" />
                          </section>
                        </section>
                      </>
                    )}
                  </div>
                )
            )}
          </div>

          {activeTab > 0 && (
            <section className="flex">
              <CommentSection
                charts={charts}
                activeTab={activeTab}
                reportId={report.id}
                pageId={tabs.filter(({ id }) => id === activeTab)[0].id}
                refetchPages={refetchPages}
              />
            </section>
          )}

          {activeTab === 0 && (
            <section className="flex items-center justify-center p-6">
              {(isColumnsLoading || isColumnsFetching) &&
                tableData.length === 0 && <Spinner />}
              {(!isColumnsFetching || !isColumnsLoading) &&
                tableData.length > 0 && <Table tableData={tableData} />}
            </section>
          )}

          {columns && showModal && (
            <Modal
              columns={columns}
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

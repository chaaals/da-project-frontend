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
import Button from "../components/Button";

import { getColumns } from "../queries/column";
import { getPages } from "../queries/page";

import useChart from "../hooks/useChart";
import useTable from "../hooks/useTable";

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

  const Header = ({ activeTab, report, charts }) => {
    const { name } = report;
    const [reportPdf, setReportPdf] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [fileName, setFileName] = useState(`${report.name} report`);
    
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    }

    const handleFileNameChange = (e) => {
      setFileName(e.target.value);
    };
  
    useEffect(() => {
      if (report && charts) {
        setReportPdf(<ReportPDF report={report} data={charts} />);
      }
    }, [report, charts]);
  
    return (
      <section className="flex justify-between items-center p-2 bg-transparent">
        <div className="text-white text-base tablet:text-xl desktop:text-4xl font-inter font-semibold">{name}</div>
        {activeTab === 0 && reportPdf !== null && (
          <div className="relative inline-block text-left">
            <Button onClick={toggleDropdown} >
              <img src="/images/kebab.svg" alt="Options" className="min-w-6 min-h-6 size-6" />
            </Button>
            {isOpen && (
              <section className="absolute right-0 mt-2 w-fit bg-colorSecondary rounded-md shadow-lg z-50 p-2 flex flex-col place-items-end gap-2">
                <input 
                  type="text" 
                  className="w-40 rounded-lg bg-colorPrimary text-white text-sm" 
                  placeholder="File Name" 
                  value={fileName}
                  onChange={handleFileNameChange}>
                </input>
                <PDFDownloadLink
                  document={reportPdf}
                  fileName={`${fileName}.pdf`}
                >
                  <button className="bg-colorButton text-white px-4 py-2 rounded-lg w-40">
                    Download Report
                  </button>
                </PDFDownloadLink>
              </section>
            )}
          </div>
        )}
      </section>
    );
  };
  
  const Tabs = ({ tabs, activeTab, setActiveTab, onAddTab }) => {
    const handleTabClick = (tabId) => {
      setActiveTab(tabId);
    };
  
    return (
      <div className="text-sm font-medium text-center text-gray-500 mt-3">
        <ul className="flex -mb-px overflow-x-auto place-items-center">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button 
                className={`inline-block p-4 border-b-2 ${
                  activeTab === tab.id
                    ? "border-activeTab text-activeTab bg-bgActiveTab"
                    : "border-[#212836] text-gray-500 hover:text-gray-400 hover:border-gray-400"
                } text-md font-inter`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.name}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={onAddTab}
              className="border-transparent p-4"
            >
              <img
                src="/images/circle-plus.svg"
                alt="Add Tab"
                className="min-w-6 min-h-6 size-6"
              />
            </button>
          </li>
        </ul>
      </div>
    );
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
    <section className="flex flex-col min-h-screen bg-transparent py-8 tablet:py-12 desktop:py-16 px-10 tablet:px-16 desktop:px-24">
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

          <div className="py-4 text-sm font-medium text-gray-500">
            {tabs.map(
              (tab) =>
                activeTab === tab.id && (
                  <div key={tab.id}>
                    {tab.id === 0 ? (
                      <>
                        <div className="flex items-start bg-tableData rounded-lg shadow-md p-6 desktop:p-8 gap-4 text-wrap breawords">
                          <img
                            src="/images/logo.svg"
                            alt="PowerBytes Logo"
                            className="mt-1 size-5"
                          />
                          <p className="text-justify text-xs desktop:text-sm font-inter">{tab.content}</p>
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
                        <section className="flex items-start bg-tableData rounded-lg shadow-md p-8 gap-4 text-wrap break-words text-justify">
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
                            <hr className="w-full mt-4 border-tableData desktop:w-[33.33%]" />
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
            <section className="flex items-center justify-center  ">
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

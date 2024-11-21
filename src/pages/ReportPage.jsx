import React, { useState } from "react";
import Modal from "../components/addReportComponents/Modal";

// Header Component
const Header = () => {
  return (
    <section className="flex justify-between items-center p-2 bg-transparent">
      <div className="text-white text-4xl font-semibold">Reports Page</div>
      <button className="bg-transparent text-white border-2 border-blue-700 px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white">
        Download Reports
      </button>
    </section>
  );
};

// Tabs Component
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
            onClick={onAddTab} // Open modal
            className="inline-block p-5 border-transparent"
          >
            <img
              src="./images/circle-plus.svg"
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

// ReportPage Component
const ReportPage = () => {
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [tabs, setTabs] = useState([
    { id: "Overview", content: "Add a report to see summary of report here" },
  ]);
  const [activeTab, setActiveTab] = useState("Overview");

  const handleAddTab = () => {
    setShowModal(true); // Open modal
  };

  const handleModalClose = () => {
    setShowModal(false); // Close modal
  };

  const handleAddReport = () => {
    const newTabId = `Report ${tabs.length + 1}`; // Generate unique ID
    const newTab = { id: newTabId, content: `${newTabId} Content` };
    setTabs((prevTabs) => [...prevTabs, newTab]); // Add new tab
    setActiveTab(newTabId); // Set the new tab as active
    setShowModal(false); // Close modal
  };

  return (
    <section className="flex flex-col min-h-screen bg-transparent">
      <Header />
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAddTab={handleAddTab}
      />
      {showModal && (
        <Modal
          toggleModal={handleModalClose} // Close modal handler
          onAddReport={handleAddReport} // Add report handler
        />
      )}
    </section>
  );
};

export default ReportPage;

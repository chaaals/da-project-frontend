import React, { useState } from "react";

// Header Component
const Header = () => {
  return (
    <section className="flex justify-between items-center p-2 bg-transparent">
      <div className="text-white text-4xl font-semibold">Reports Page</div>
      {/* Made text bigger */}
      <button className="bg-transparent text-white border-2 border-blue-700 px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white">
        Download Reports
      </button>
    </section>
  );
};

// Tab Component with Plus Sign and Dynamic Tab Functionality
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [tabs, setTabs] = useState([
    { id: "Overview", content: "Add a report to see summary of report here" },
  ]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleAddTab = () => {
    const newTabId = `Report ${tabs.length}`; // Unique ID for new tab
    const newTab = { id: newTabId, content: `${newTabId} Content` };
    setTabs([...tabs, newTab]);
    setActiveTab(newTabId); // Set the newly added tab as the active tab
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
            onClick={handleAddTab}
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
                    <button
                      onClick={handleAddTab}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Add a Report
                    </button>
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

// ReportPage Component (Combining Everything)
const ReportPage = () => {
  return (
    <section className="flex flex-col min-h-screen bg-transparent">
      <Header />
      <Tabs />
    </section>
  );
};

export default ReportPage;

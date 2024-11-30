import React, { useContext } from "react";
import AppContext from "../context/app";
import Button from "../components/Button";
import DynamicTable from "../components/DynamicTable"
import { useCustomNavigate } from "../hooks/useCustomNavigate";

function Home() {
  const reportColumns = ["ID", "Report_Name", "Date"];
  const reportData = [
    { ID: 1, Report_Name: "Student Performance Overview", Date: "09-22-2024" },
    { id: 2, Report_Name: "Academic Trends and Insights", date: "02-14-2024" },
    { id: 3, Report_Name: "Student Enrollment Statistics", date: "07-04-2024" },
    { id: 4, Report_Name: "Grade Distribution Analysis", date: "03-20-2024" },
    { id: 5, Report_Name: "Attendance and Participation Trends", date: "05-30-2024" },
    { id: 6, Report_Name: "Demographic Breakdown of Students", date: "12-01-2023" },
    { id: 7, Report_Name: "Student Success and Retention Rates", date: "08-18-2024" },
    { id: 8, Report_Name: "Year-over-Year Academic Progress", date: "01-15-2024" },
    { id: 9, Report_Name: "Student Engagement and Interaction Metrics", date: "04-25-2024" },
    { id: 10, Report_Name: "Performance Comparison by Subject", date: "06-10-2024" },
  ];


  const {
    selectedFile,
    fileInputRef,
    handleButtonClick,
    handleFileChange,
    removeFile,
  } = useContext(AppContext);
  
  const { goto } = useCustomNavigate()

  return (
    <section className="flex-col space-y-7 py-16 px-24 w-full">
      <header className="flex gap-3 text-textPrimary">
        <img src="./images/search.svg" alt="Search Icon" className="size-9" />
        <h1 className="text-textPrimary text-3xl font-inter font-bold">
          Instant Reports with PowerBytes!
        </h1>
      </header>
      <p className="text-textPrimary text-justify">
        <strong>PowerBytes</strong> is an easy-to-use web and mobile app that
        lets you upload CSV or XLS files, generate interactive charts, and
        visualize your data in minutes. With Bytes, our AI assistant, you can
        ask questions about your data and get intelligent insights instantly.
        Once you’re done, download your reports to share and present your
        findings. PowerBytes is your go-to tool for quick, smart, and
        beautiful data analysis—anytime, anywhere.
      </p>

      {!selectedFile ? (
        <>
          <Button
            onClick={handleButtonClick}
            style="w-full bg-colorSecondary rounded-xl h-64 text-textSecondary p-4 flex flex-col justify-center place-items-center"
          >
            <div className="grid-cols-1">
              <img
                src="./images/upload.svg"
                alt="Search Icon"
                className="size-auto max-w-12 max-h-12 place-self-center mx-auto"
              />
              <span className="font-inter">
                <strong>Click to upload </strong>or drag and drop CSV
              </span>
            </div>
          </Button>
          <div className="h-1 bg-colorSecondary"></div>
          <section className="flex-col space-y-7 w-full mt-16">
            <header className="flex gap-3 text-textPrimary">
              <img
                src="./images/history.svg"
                alt="History Icon"
                className="size-9"
              />
              <h1 className="text-textPrimary text-3xl font-inter font-bold">
                History
              </h1>
            </header>
            <div className="h-fit bg-colorSecondary rounded-xl py-6">
              <DynamicTable columns={reportColumns} data={reportData} />
            </div>
          </section>
        </>
      ) : (
        <section className="flex-col space-y-9">
          <header className="w-full bg-colorSecondary rounded-xl text-textPrimary flex h-12">
            <Button onClick={handleButtonClick} style="rounded-xl grid-cols-1 justify-items-center text-textSecondary bg-[#4B5563] py-2 px-12">
              <span className="font-inter text-textPrimary font-bold text-base">Choose a File</span>
            </Button>
            <span className="font-inter italic text-xl text-[#979A9F] ml-7 my-auto">
              {selectedFile.name}
            </span>
          </header>
          <aside className="flex gap-4 justify-end">
            <Button onClick={removeFile} style="bg-[#C81E1E] h-12 rounded-lg px-4 ">
              <span className="font-inter text-white">Clear</span>
            </Button>
            <Button onClick={() => goto("/report")} style="bg-colorButton h-12 rounded-lg px-4">
              <span className="font-inter text-white">Create Report</span>
            </Button>
          </aside>
        </section>
      )}
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </section>
  );
}

export default Home;

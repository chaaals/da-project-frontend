import React, { useRef, useContext } from "react";
import AppContext from "../context/app";
import Button from "../components/Button";
import Table from "../components/table";

function Home() {
  // const { greet } = useContext(AppContext);

  // dummy data for table
  const report_data = [
    { id: 1, name: 'Student Performance Overview', date: '09-22-2024' },
    { id: 2, name: 'Academic Trends and Insights', date: '02-14-2024' },
    { id: 3, name: 'Student Enrollment Statistics', date: '07-04-2024' },
    { id: 4, name: 'Grade Distribution Analysis', date: '03-20-2024' },
    { id: 5, name: 'Attendance and Participation Trends', date: '05-30-2024' },
    { id: 6, name: 'Demographic Breakdown of Students', date: '12-01-2023' },
    { id: 7, name: 'Student Success and Retention Rates', date: '08-18-2024' },
    { id: 8, name: 'Year-over-Year Academic Progress', date: '01-15-2024' },
    { id: 9, name: 'Student Engagement and Interaction Metrics', date: '04-25-2024' },
    { id: 10, name: 'Performance Comparison by Subject', date: '06-10-2024' },
  ];

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Programmatically click the hidden file input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      console.log('File name:', file.name);
      console.log('File size:', file.size, 'bytes');
      console.log('File type:', file.type);
      alert(`File selected: ${file.name}`);  // Optional: Display the file details on the screen
    }
  };

  return (
    <section className="flex-col space-y-[72px]">
      <section className="flex-col space-y-7 w-full">
        <header className="flex gap-3 text-textPrimary">
            <img src="./images/search.svg" alt="Search Icon" className="size-9"/>
            <h1 className="text-textPrimary text-3xl font-inter font-bold">Instant Reports with PowerBytes!</h1>
        </header>
        <p className="text-textPrimary text-justify">
            <strong>PowerBytes</strong> is an easy-to-use web and mobile app that lets you upload CSV or XLS files, generate interactive charts, and
            visualize your data in minutes. With Bytes, our AI assistant, you can ask questions about your data and get intelligent insights
            instantly. Once you’re done, download your reports to share and present your findings. PowerBytes is your go-to tool for quick,
            smart, and beautiful data analysis—anytime, anywhere.
        </p>
        <Button onClick={handleButtonClick} style="w-full bg-colorSecondary rounded-xl grid-cols-1 justify-items-center h-64 text-textSecondary">
          <img src="./images/upload.svg" alt="Search Icon" className="size-12"/>
          <p className="font-inter"><strong>Click to upload </strong>or drag and drop <br></br>CSV or XLS File</p>
        </Button>
        <input type="file" accept=".csv, .xls, .xlsx" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
      </section>
      <div className="h-2 bg-colorSecondary"></div>
      <section className="flex-col space-y-7 w-full">
        <header className="flex gap-3 text-textPrimary">
          <img src="./images/history.svg" alt="History Icon" className="size-9"/>
          <h1 className="text-textPrimary text-3xl font-inter font-bold">History</h1>
        </header>
        <div className="h-fit bg-colorSecondary rounded-xl py-6">
          <Table data={report_data.slice(0,5)}/>
        </div>
      </section>
    </section>
  );
}

export default Home;

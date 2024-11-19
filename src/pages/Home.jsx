import React, { useRef, useContext } from "react";
import AppContext from "../context/app";
import Button from "../components/Button";

function Home() {
  // const { greet } = useContext(AppContext);

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
    <section className="flex-col space-y-5 w-full">
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
  );
}

export default Home;

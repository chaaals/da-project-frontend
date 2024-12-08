import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import AppContext from "../context/app";

import { getReports, postReport } from "../queries/report";
import { postCSV } from "../queries/csv";

import Table from "../components/Table";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import DynamicTable from "../components/DynamicTable";

import useTable from "../hooks/useTable";

function Home() {
  const {
    selectedFile,
    fileInputRef,
    handleButtonClick,
    handleFileChange,
    removeFile,
  } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const { tableData, parseFetchedTable } = useTable({
    csvUpload: selectedFile,
  });

  const { isFetching, isLoading, data } = useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });

  const {
    data: cleanedColumns,
    mutate: cleanCSV,
    isPending: isCleaning,
  } = useMutation({
    mutationFn: postCSV,
    onSuccess: (data) => {
      console.log("Data has been cleaned");
      parseFetchedTable(data);
      setStep(2);
    },
    onError: (error) => {
      console.error("Oops, something went wrong.", error);
    },
  });

  const { mutate: createReport, isPending: isCreating } = useMutation({
    mutationFn: postReport,
    onSuccess: (data) => {
      const { report } = data;
      navigate(`/report/${report.id}`);
    },
    onError: (error) => {
      console.error("Oops, something went wrong.", error);
    },
  });

  const reportColumns = ["id", "name"];

  const onClearFile = () => {
    removeFile();
    setStep(1);
  };

  const onCleanData = () => {
    const formData = new FormData();
    formData.append("csv_upload", selectedFile);

    cleanCSV(formData);
  };

  const onAddReport = () => {
    const [reportName] = selectedFile.name.split(".");
    const payload = {
      name: reportName,
      clean_columns: cleanedColumns,
    };

    createReport(payload);
  };

  return (
    <section className="flex-col space-y-7 py-8 tablet:py-12 desktop:py-16 px-10 tablet:px-16 desktop:px-24 w-full">
      <header className="flex gap-3 text-textPrimary place-items-center">
        <img src="./images/search.svg" alt="Search Icon" className="size-7 desktop:size-9" />
        <h1 className="text-textPrimary text-lg desktop:text-3xl font-inter font-bold">
          Instant Reports with PowerBytes!
        </h1>
      </header>
      <p className="text-textPrimary text-justify font-inter text-sm desktop:text-base">
        <strong>PowerBytes</strong> is an easy-to-use web and mobile app that
        lets you upload CSV, generate interactive charts, and
        visualize your data in minutes. With Bytes, our AI assistant, you can
        ask questions about your data and get intelligent insights instantly.
        Once you’re done, download your reports to share and present your
        findings. PowerBytes is your go-to tool for quick, smart, and beautiful
        data analysis—anytime, anywhere.
      </p>

      {!selectedFile ? (
        <>
          <Button
            onClick={handleButtonClick}
            style="w-full bg-colorSecondary rounded-xl h-64 text-textSecondary py-4 px-8 flex flex-col justify-center place-items-center"
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
          {data && data.length > 0 ? (
            <>
              <div className="h-1 bg-colorSecondary"></div>
              <section className="flex-col space-y-7 w-full mt-16">
                <header className="flex gap-3 text-textPrimary place-items-center">
                  <img src="./images/history.svg" alt="History Icon" className="size-7 desktop:size-9" />
                  <h1 className="text-textPrimary text-lg desktop:text-3xl font-inter font-bold">
                    History
                  </h1>
                </header>
                <div className="h-fit bg-colorSecondary rounded-xl py-6">
                  {(isLoading || isFetching) && <Spinner />}
                  {!isLoading && !isFetching && 
                      <DynamicTable
                        columns={reportColumns}
                        data={data.slice(-5).reverse()}
                        isPaginationHidden={true}
                      />
                  }
                </div>
              </section> 
              </>) : (
              <div></div>
            )
          }
        </>
      ) : (
        <section className="flex-col space-y-9">
          <header className="w-full bg-colorSecondary rounded-xl text-textPrimary flex h-12">
            <Button
              onClick={handleButtonClick}
              style="rounded-xl flex place-items-center text-textSecondary bg-[#4B5563] py-2 px-4 tablet:px-7 desktop:px-12 max-w-52"
            >
              <span className="font-inter text-textPrimary font-bold text-xs tablet:text-sm desktop:text-base text-nowrap">
                Choose a File
              </span>
            </Button>
            <span className="font-inter italic text-[#979A9F] mx-4 truncate desktop:mx-7 my-auto text-sm tablet:text-base desktop:text-xl text-nowrap">
              {selectedFile.name}
            </span>
          </header>

          {tableData.length > 0 && <Table tableData={tableData} />}

          <aside className="flex gap-4 justify-end">
            <Button
              onClick={onClearFile}
              style="bg-[#C81E1E] h-12 rounded-lg px-4 "
            >
              <span className="font-inter text-white">Clear</span>
            </Button>
            {step === 1 && (
              <Button
                onClick={onCleanData}
                style="w-32 bg-colorButton h-12 rounded-lg px-4"
              >
                {isCleaning && <Spinner />}
                {!isCleaning && (
                  <span className="font-inter text-white text-nowrap">Clean Data</span>
                )}
              </Button>
            )}
            {step === 2 && (
              <Button
                onClick={onAddReport}
                style="w-34 bg-colorButton h-12 rounded-lg px-4"
              >
                {isCreating && <Spinner />}
                {!isCreating && (
                  <span className="font-inter text-white text-nowrap">Create Report</span>
                )}
              </Button>
            )}
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

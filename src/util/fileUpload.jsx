import { useState, useRef } from "react";

export function useFileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically click the hidden file input
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      setSelectedFile(file); // Update state with the selected file
    }
  };

  const removeFile = () => {
    setSelectedFile(null); // Clear the selected file
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input value
    }
  };

  return {
    selectedFile,
    fileInputRef,
    handleButtonClick,
    handleFileChange,
    removeFile,
  };
}

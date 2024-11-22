import { createContext, useRef, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <AppContext.Provider
      value={{
        selectedFile,
        setSelectedFile,
        fileInputRef,
        handleFileChange,
        handleButtonClick,
        removeFile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

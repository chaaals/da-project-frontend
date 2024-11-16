import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [greet, setGreet] = useState("Hello world");
  return (
    <AppContext.Provider value={{ greet, setGreet }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

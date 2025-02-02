import { Routes, Route } from "react-router-dom";
import Layout from "./layout";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ReportPage from "./pages/ReportPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="report/:reportId" element={<ReportPage />} />
        <Route path="history" element={<HistoryPage />} />
        {/* Add Other Routes */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

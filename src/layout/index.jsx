import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col min-h-screen bg-colorPrimary overflow-auto w-full">
        <NavBar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;

import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main className="w-full bg-colorPrimary h-screen py-16 px-24 overflow-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <main className="w-full bg-colorPrimary h-screen py-16 px-24">
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;

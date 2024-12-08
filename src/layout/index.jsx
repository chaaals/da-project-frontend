import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <main className="w-full bg-colorPrimary">
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;

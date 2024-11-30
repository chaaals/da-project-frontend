import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <main className="h-screen w-full bg-colorPrimary overflow-auto">
      <NavBar /> 
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;

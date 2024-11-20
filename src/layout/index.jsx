import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="w-full bg-colorPrimary h-screen py-16 px-24 overflow-auto">
        {/* Add navbar */}
        <Outlet />
        {/* Add footer */}
    </main>

  );
};

export default Layout;

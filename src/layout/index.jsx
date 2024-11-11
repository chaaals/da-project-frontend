import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="w-full">
      {/* Add navbar */}
      <Outlet />
      {/* Add footer */}
    </main>
  );
};

export default Layout;

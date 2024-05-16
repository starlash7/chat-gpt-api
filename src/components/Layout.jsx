import { Outlet } from "react-router-dom";
import Header from "./Header";
import { FiSearch } from "react-icons/fi";

const Layout = () => {
  return (
    <div className="bg-white-100 max-w-screen-md mx-auto min-h-screen shadow-md">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;

import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import Button from "./Button";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 770) {
        setIsMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className={`${isMenuOpen ? "pb-0" : "pb-6"} bg-tableData p-6 flex-col w-full`}>
      <section className="flex justify-between">
        <NavLink to="/" className="flex items-center space-x-2">
          <img src="/images/logo.svg" alt="PowerBytes Logo" className="size-10"/>
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">PowerBytes</span>
        </NavLink>
        <section className="flex space-x-2 tablet:space-x-4 desktop:space-x-7">
          <NavLink
              to="/"
              className={`rounded-md px-4 py-2 hidden desktop:block ${
                location.pathname === "/"
                  ? "text-white"
                  : "text-textPrimary"
              }`}
            >Home
          </NavLink>
          <NavLink
              to="/history"
              className={`rounded-md px-4 py-2 hidden desktop:block ${
                location.pathname === "/history"
                  ? "text-white"
                  : "text-textPrimary"
              }`}
            >History
          </NavLink>
          <Button onClick={toggleMenu}
            style="items-center size-10 text-gray-400 rounded-lg flex desktop:hidden">
            <span className="sr-only">Open main menu</span>   
            {isMenuOpen ? (
                <img
                  src="/images/close.svg"
                  alt="Close menu"
                  className="min-w-6 min-h-6 size-6"
                />
              ) : (
                <img
                  src="/images/burger.svg"
                  alt="Close menu"
                  className="min-w-6 min-h-6 size-6"
                />
              )}
          </Button>
        </section>
      </section>
      <section className={`${isMenuOpen ? "block" : "hidden"} desktop:hidden block w-full`}>
        <ul className="flex flex-col font-medium py-4 bg-tableData">
          <li>
            <NavLink
              to="/"
              className={`block py-2 px-4 rounded ${
                location.pathname === "/"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={`block py-2 px-4 rounded ${
                location.pathname === "/history"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              History
            </NavLink>
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default NavBar;

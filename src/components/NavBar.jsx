import React, { useContext, useState, useEffect } from "react";
import AppContext from "../context/app";
import Button from "./Button";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const {
    selectedFile,
    fileInputRef,
    handleButtonClick,
    handleFileChange,
    removeFile,
  } = useContext(AppContext);

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
        <a href="/" className="flex items-center space-x-2">
          <img src="/images/logo.svg" alt="PowerBytes Logo" className="size-10"/>
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">PowerBytes</span>
        </a>
        <section className="flex space-x-2 tablet:space-x-4 desktop:space-x-7">
          <a href="/" className="text-white hover:bg-[#1B1F25] rounded-md px-4 py-2 hidden desktop:block"> Home </a>
          <a href="/history" className="text-white hover:bg-[#1B1F25] rounded-md px-4 py-2 hidden desktop:block" > History </a>
          <button type="button" onClick={toggleMenu}
            className="items-center size-10 justify-center text-gray-400 rounded-lg flex desktop:hidden">
            <span className="sr-only">Open main menu</span>   
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
            </svg>
          </button>
        </section>
      </section>
      <section className={`${isMenuOpen ? "block" : "hidden"} desktop:hidden block w-full`}>
        <ul className="flex flex-col font-medium py-4 bg-tableData">
          <li>
            <a href="/" className="block py-2 px-4 rounded text-white bg-blue-700 hover:bg-blue-800" >
              Home
            </a>
          </li>
          <li>
            <a href="/history" className="block py-2 px-4 rounded text-gray-300 hover:bg-gray-700 hover:text-white">
              History
            </a>
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default NavBar;

import React, { useState } from "react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#1F2A37] border-gray-200">
      <div className="flex flex-wrap items-center justify-between mx-0 p-4">
        <a href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <img
            src="/images/logo.svg" // Update with the correct logo path
            className="h-10 w-10" // Adjust height and width for better scaling
            alt="PowerBytes Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            PowerBytes
          </span>
        </a>

        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Home and History buttons */}
          <a
            href="#"
            className="text-white hover:bg-[#1B1F25] rounded-md px-4 py-2"
          >
            Home
          </a>
          <a
            href="#"
            className="text-white hover:bg-[#1B1F25] rounded-md px-4 py-2"
          >
            History
          </a>

          {/* Upload CSV button */}
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Upload CSV
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-end text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
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
        </div>
      </div>

      {/* Mobile menu items */}
      <div
        className={`${isMenuOpen ? "block" : "hidden"} md:hidden w-full`}
        id="navbar-cta"
      >
        <ul className="flex flex-col font-medium p-4 bg-[#1F2A37]">
          <li>
            <a
              href="#"
              className="block py-2 px-4 rounded text-white bg-blue-700 hover:bg-blue-800"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 rounded text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              History
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

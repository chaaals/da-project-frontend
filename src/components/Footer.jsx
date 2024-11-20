import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1F2A37] text-white py-4 mt-16">
      <div className="flex items-center justify-center mx-4 space-x-2 opacity-80">
        <div className="flex items-center space-x-2">
          <img
            src="/images/logo.svg"
            alt="PowerBytes Logo"
            className="h-8 w-8"
          />
          <span className="text-sm font-medium">PowerBytes</span>
        </div>
        <div className="text-sm">
          <span>made by </span>
          <span className="font-semibold">Teambangan</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

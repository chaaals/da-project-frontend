import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1F2A37] text-white py-6 flex justify-center font-inter space-x-3 items-center">
        <img src="/images/logo.svg" alt="PowerBytes Logo" className="size-8" />
        <p className="text-base font-medium">
          PowerBytes made by <span className="font-semibold"> Teambangan</span>
        </p>
    </footer>
  );
};

export default Footer;

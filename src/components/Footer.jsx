import React from "react";

const Footer = () => {
  return (
    <footer className="bg-tableData text-white py-6 flex justify-center font-inter space-x-3 items-center px-4">
        <img src="/images/logo.svg" alt="PowerBytes Logo" className="size-6 desktop:size-8" />
        <p className="text-sm desktop:text-base font-medium text-nowrap">
          PowerBytes made by <span className="font-semibold"> Teambangan</span>
        </p>
    </footer>
  );
};

export default Footer;

import React, { useState } from "react";

const AskBytes = () => {
  return (
    <>
      <div className="p-5 md:p-2 col-span-2 mt-2">
        <header className="flex gap-3 text-textPrimary">
          <img src="./images/bytes.svg" alt="Search Icon" className="size-6" />
          <h1 className="text-textPrimary text-ml font-inter font-bold mb-4">
            Ask BYTES, our personal A.I.
          </h1>
        </header>
        <textarea
          id="prompt"
          rows="4"
          className="block p-2.5 w-full text-sm text-white bg-gray-700 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your prompt here"
        ></textarea>
      </div>
    </>
  );
};

export default AskBytes;

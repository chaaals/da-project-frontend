const Preview = ({ children }) => {
  return (
    <>
      <div className="p-5 md:p-2 col-span-2 ">
        <header className="flex gap-3 text-textPrimary">
          <h1 className="text-textPrimary text-ml font-inter font-bold mb-4">
            Preview
          </h1>
        </header>

        <div className="w-full flex items-center justify-center bg-white rounded-xl">
          {children}
        </div>
      </div>
    </>
  );
};

export default Preview;

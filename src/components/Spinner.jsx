const Spinner = ({ size = "medium", color = "blue", className = "" }) => {
  const sizeVariants = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-4",
    large: "w-12 h-12 border-4",
  };

  const colorVariants = {
    blue: "border-blue-500 border-t-blue-200",
    green: "border-green-500 border-t-green-200",
    red: "border-red-500 border-t-red-200",
    gray: "border-gray-500 border-t-gray-200",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`
            ${sizeVariants[size] || sizeVariants.medium} 
            ${colorVariants[color] || colorVariants.blue} 
            border-solid 
            rounded-full 
            animate-spin
            ${className}
          `}
      />
    </div>
  );
};

export default Spinner;

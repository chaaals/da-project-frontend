import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex-col text-center text-white w-full">
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
};

export default NotFound;

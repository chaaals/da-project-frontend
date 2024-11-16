import { useContext } from "react";
import AppContext from "../context/app";

function Home() {
  const { greet } = useContext(AppContext);
  return <div>Home {greet}</div>;
}

export default Home;

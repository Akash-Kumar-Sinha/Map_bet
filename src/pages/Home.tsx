import { useContext } from "react";

import Header from "../components/Header";
import Mapboard from "../components/Mapboard";
import { ThemeContext } from "../utils/Theme/ThemeContext";

const Home: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <Header />

      <div
        className={`h-screen ${
          theme === "DARK"
            ? "bg-zinc-950 text-zinc-50"
            : "bg-zinc-50 text-zinc-950"
        } p-4 pt-16`}
      >
        <Mapboard />
      </div>
    </div>
  );
};

export default Home;

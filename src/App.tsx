import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";

const App = () => {
  return (
    <div className="h-screen w-full">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;

import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Atlas from "./pages/Atlas";

function App() {
  const [parentState, setParentState] = useState("");

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home setParentState={setParentState} />} />
        <Route path="/atlas" element={<Atlas parentState={parentState} />} />
      </Routes>
    </div>
  );
}

export default App;

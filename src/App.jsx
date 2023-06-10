import { useState } from "react";
import DataDisplay from "./components/DataDisplay";
import SearchBar from "./components/SearchBar";
import { icon } from "./constants/constants";

function App() {
  const [parentState, setParentState] = useState("");

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      {!parentState && (
        <>
          <span>{icon.book}</span>
          <h1 className="text-center m-5 font-bold text-2xl">
            ANNUAIRE DES ETABLISSEMENTS PUBLICS
          </h1>
          <SearchBar setState={setParentState} />
        </>
      )}
      {parentState && <DataDisplay parentState={parentState} />}
    </div>
  );
}

export default App;

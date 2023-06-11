import DataDisplay from "../components/DataDisplay";
import SearchBar from "../components/SearchBar";
import { icon } from "../constants/constants";
import { useState } from "react";

const Home = () => {
  const [parentState, setParentState] = useState("");
  //TODO: navigation

  return (
    <>
      {!parentState && (
        <div className="w-screen h-screen flex items-center justify-center flex-col">
          <>
            <span>{icon.book}</span>
            <h1 className="text-center m-5 font-bold text-2xl">
              ANNUAIRE DES ETABLISSEMENTS PUBLICS
            </h1>
            <SearchBar setState={setParentState} />
          </>
        </div>
      )}
      {parentState && <DataDisplay parentState={parentState} />}
    </>
  );
};

export default Home;

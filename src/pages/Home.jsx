/* eslint-disable react/prop-types */
import SearchBar from "../components/SearchBar";
import { icon } from "../constants/constants";

const Home = ({ setParentState }) => {
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center flex-col">
        <span>{icon.book}</span>
        <h1 className="text-center m-5 font-bold text-2xl">
          ANNUAIRE DES ETABLISSEMENTS PUBLICS
        </h1>
        <SearchBar setParentState={setParentState} />
        <div className="flex flex-col justify-center items-center fixed bottom-0 left-0 w-full">
          <p>Réalisé par Amaury Tissot</p>
          <p>Application à usage strictement personnel</p>
          <a
            href="https://github.com/AmauryTISSOT/Annuaire"
            target={"_blank"}
            rel="noreferrer"
            className="my-4 hover:animate-spin"
            data-testid="github-link"
          >
            <span>{icon.github}</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;

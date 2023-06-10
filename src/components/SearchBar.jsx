/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const SearchBar = ({ setState }) => {
  const [matchResponse, setMatchResponse] = useState(false);
  // Stores the list of matching communes
  const [listeCommune, setListeCommune] = useState([]);
  const [input, setInput] = useState();
  //   const [selectValue, setSelectValue] = useState();

  const handleChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    setInput(inputValue);
  };

  const handleSuggestionClick = (suggestion) => {
    setMatchResponse(!matchResponse);
    // send suggestion to parent component
    setState(suggestion);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://apicarto.ign.fr/api/codes-postaux/communes/${input}`
        );
        if (response.status === 200) {
          const data = await response.json();
          setListeCommune([data]);
          setMatchResponse(true);
        } else {
          setListeCommune(["invalid"]);
          setMatchResponse(false);
        }
      } catch (error) {
        setListeCommune(["invalid"]);
        setMatchResponse(false);
      }
    };

    // Regular expression to match 5 digits = code postal
    const regex = /^\d{5}$/;
    if (regex.test(input)) {
      const timer = setTimeout(() => {
        fetchData();
      }, 200);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [input]);

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <input
          className=" w-[350px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="text"
          placeholder="Code postal..."
          pattern="\d{5}"
          maxLength="5"
          required
          onChange={handleChange}
        />
        <ul className="absolute z-10 w-[350px] px-4 rounded-md shadow-lg">
          {/* Render the suggestion list if there is a match */}
          {matchResponse &&
            listeCommune[0].map((item, index) => (
              <li
                className="py-4 hover:bg-blue-300 cursor-pointer rounded-md"
                key={index}
                onClick={() => handleSuggestionClick(item)}
              >
                {item.codePostal} - {item.nomCommune}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;

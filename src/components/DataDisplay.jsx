/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { service } from "../constants/constants";

const DataDisplay = ({ parentState }) => {
  const [internalState, setInternalState] = useState("");
  const [clickedService, setClickedService] = useState("");

  useEffect(() => {
    if (parentState) {
      Object.keys(service).forEach((item) =>
        fetchAPI(parentState.codeCommune, item)
      );
    }
  }, [parentState]);

  const fetchAPI = async (codeCommune, service) => {
    try {
      const url = new URL(
        `https://etablissements-publics.api.gouv.fr/v3/communes/${codeCommune}/${service}`
      );
      const response = await fetch(url);

      if (response.status >= 200 && response.status < 300) {
        const apiData = await response.json();
        setInternalState((prev) => ({
          ...prev,
          [service]: apiData,
        }));
      } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    } catch (error) {
      console.log("request failed", error);
    }
    console.count();
  };
  console.log(internalState);
  console.log("clicked", clickedService);

  return (
    <div className="flex">
      {/* Affichage des différentes catégories de service */}
      <div className=" h-screen w-[300px] bg-blue-300">
        <ul className="py-4">
          {Object.keys(internalState).map((serviceTitle, index) => (
            <li
              className="mb-2 px-4 py-2 font-bold text-gray-800 hover:bg-blue-400 cursor-pointer flex justify-start items-center gap-4"
              key={index}
              onClick={() => setClickedService(serviceTitle)}
            >
              <span>{service[serviceTitle].icon}</span>
              <div>{service[serviceTitle].name}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Affiche la commune selectionnée */}
      <div className="h-full w-full flex flex-col justify-center">
        <h1 className="m-4 font-bold text-2xl text-center">
          Commune sélectionnée : <br />
          {parentState.codePostal} - {parentState.nomCommune}
        </h1>

        {!clickedService && (
          <div className="animate-pulse font-bold text-3xl text-center w-full mt-[200px]">
            {" "}
            Sélectionner le service recherché
          </div>
        )}

        {/* Affiche les données relatives au service sélectionné */}
        {clickedService && (
          <div className="px-12">
            {internalState[clickedService].features.map(
              (featuresItem, index) => (
                <div id="service-name" className="m-4" key={index}>
                  <h2 className="font-bold">{featuresItem.properties.nom}</h2>
                  <div>
                    {featuresItem.properties.adresses[0].lignes.map(
                      (lignesItem, index) => (
                        <div id="street-name" key={index}>
                          {lignesItem}
                        </div>
                      )
                    )}
                  </div>
                  <div>
                    {featuresItem.properties.adresses[0].codePostal} -{" "}
                    {featuresItem.properties.adresses[0].commune}
                  </div>
                  Téléphone : {featuresItem.properties.telephone}
                  <br></br>
                  <a
                    className="text-blue-600 hover:text-blue-900 transition-colors duration-300"
                    href={`${featuresItem.properties.url}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {featuresItem.properties.url}
                  </a>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataDisplay;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../country.css";
import useCountryData from "./useCountryData";

interface CountryData {
  numericCode: string;
  flag: string;
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  topLevelDomain: string[];
  currencies: { name: string }[];
  languages: { name: string }[];
  borders: string[];
}

const Country: React.FC = () => {
  const { countries, loading, error } = useCountryData(
    "https://restcountries.com/v2/all"
  );
  const [country, setCountry] = useState<CountryData | null>(null);
  const [borderNames, setBorderNames] = useState<string[]>([]);
  const navigate = useNavigate();
  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await fetch(`https://restcountries.com/v2/name/${name}`);
      const countryData: CountryData[] = await response.json();
      
      if (countryData.length > 0) {
        const countryInfo = countryData[0];
        setCountry(countryInfo);
  
        if (countryInfo.borders.length > 0) {
          const borderCountryNames = await Promise.all(
            countryInfo.borders.map(async (border) => {
              const response = await fetch(
                `https://restcountries.com/v2/alpha/${border}`
              );
              const borderData = await response.json();
              return borderData.name;
            })
          );
          setBorderNames(borderCountryNames);
        }
      } else {
        setCountry(null); 
      }
    };
  
    fetchCountryData();
  }, [name]);

  // Handle back button click
  const handleBackButtonClick = () => {
    navigate("/rest-countries-api-new");
  };

  if (!country) {
    return null;
  }

  const {
    flag,
    name: countryName,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
  } = country;

  return (
    <>
      <section className="country">
        <button className="btn btn-light" onClick={handleBackButtonClick}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <article>
          <div className="country-container">
            <div className="flag">
              <img src={flag} alt={countryName} />
            </div>
            <div className="country-info">
              <div className="flex">
                <h2 className="country-name">{name}</h2>
                <h5>
                  Native Name: <span>{nativeName}</span>
                </h5>
                <h5>
                  Population: <span>{population}</span>
                </h5>
                <h5>
                  Region: <span>{region}</span>
                </h5>
                <h5>
                  Sub Region: <span>{subregion}</span>
                </h5>
                <h5>
                  Capital: <span>{capital}</span>{" "}
                </h5>
              </div>

              <div className="flex">
                <h5>
                  Top Level Domain: <span>{topLevelDomain.join(", ")}</span>{" "}
                </h5>
                <h5>
                  Currencies: <span>{currencies[0]?.name}</span>
                </h5>
                <h5>
                  Languages: <span>{languages[0]?.name}</span>
                </h5>
              </div>
              {/* <div className="container">
                <h5>Border </h5> &nbsp; <span>Countries:</span>
                <div className="borders">
                  {borderNames.map((borderName) => (
                    <ul key={borderName}>
                      <li>{borderName}</li>
                    </ul>
                  ))}
                </div>
              </div> */}
             <div className="container">
  {borderNames.length > 0 ? (
    <>
      <h5>Border </h5> &nbsp; <span>Countries:</span>
      <div className="borders">
        {borderNames.slice(0, 4).map((borderName) => (
          <ul key={borderName}>
            <li>{borderName}</li>
          </ul>
        ))}
      </div>
    </>
  ) : (
    <p>No border countries</p>
  )}
</div>

            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default Country;

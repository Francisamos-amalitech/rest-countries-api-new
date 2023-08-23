import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCountryData } from "./CountryContext";
import "../country.css";

interface CountryData {
  alpha3Code: string;
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
  const { countries } = useCountryData();
  const [country, setCountry] = useState<CountryData | null>(null);
  const [borderNames, setBorderNames] = useState<string[]>([]);
  const navigate = useNavigate();
  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    const countryInfo = countries.find((c: CountryData) => c.name === name);

    if (countryInfo) {
      setCountry(countryInfo);

      if (countryInfo.borders && countryInfo.borders.length > 0) {
        const borderCountryNames = countryInfo.borders
          .map((border: string) => {
            const borderCountry = countries.find(
              (c: CountryData) => c.alpha3Code === border
            );
            return borderCountry ? borderCountry.name : "";
          })
          .filter(Boolean); 
        setBorderNames(borderCountryNames);
      } else {
        setBorderNames([]);
      }
    } else {
      setCountry(null);
      setBorderNames([]);
    }
  }, [name, countries]);

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
                  Top Level Domain:{" "}
                  <span>{topLevelDomain.join(", ")}</span>{" "}
                </h5>
                <h5>
                  Currencies: <span>{currencies[0]?.name}</span>
                </h5>
                <h5>
                  Languages: <span>{languages[0]?.name}</span>
                </h5>
              </div>

              <div className="container">
                {borderNames.length > 0 ? (
                  <>
                    <h5>Border Countries:</h5>
                    <div className="borders">
                      {borderNames.slice(0, 4).map((borderName, index) => (
                        <ul key={index}>
                          {borderName}
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

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../country.css';

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
  const [country, setCountry] = useState<CountryData[]>([]);
  const { name } = useParams<{ name: string }>();
   console.log(name)

  useEffect(() => {
    const fetchCountryData = async () => {
        const response = await fetch(`https://restcountries.com/v2/name/${name}`);
        const countryData: CountryData[] = await response.json();
        setCountry(countryData);
    };

    fetchCountryData();
   
   
  }, [name]);

  return (
    <>
      <section className="country">
        <Link to="/" className="btn btn-light">
          <i className="fas fa-arrow-left"></i> Back Home
        </Link>
        {country.map((single) => {
          const {
            numericCode,
            flag,
            name,
            nativeName,
            population,
            region,
            subregion,
            capital,
            topLevelDomain,
            currencies,
            languages,
            borders,
          } = single;

          return (
            <article key={numericCode}>
              <div className="country-container">
                <div className="flag">
                  <img src={flag} alt={name} />
                </div>
                <div className="country-info">
                  <div>
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
                      Capital: <span>{capital}</span>{' '}
                    </h5>
                  </div>

                  <div>
                    <h5>
                      Top Level Domain: <span>{topLevelDomain.join(', ')}</span>{' '}
                    </h5>
                    <h5>
                      Currencies: <span>{currencies[0]?.name}</span>
                    </h5>
                    <h5>
                      Languages: <span>{languages[0]?.name}</span>
                    </h5>
                  </div>
                </div>
              </div>
              <div>
                <h3>Border Countries :</h3>
                <div className="borders">
                  {borders.map((border) => {
                    return (
                      <ul key={border}>
                        <li>{border}</li>
                      </ul>
                    );
                  })}
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default Country;

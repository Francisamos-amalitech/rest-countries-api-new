import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";

interface Country {
  numericCode: string;
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
}

const url = "https://restcountries.com/v2/all";

const Countries: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [regionFilter, setRegionFilter] = useState<string>("All");

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(url);
        const countriesData: Country[] = await response.json();
        setCountries(countriesData);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountryData();
  }, []);

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRegionFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRegionFilter(event.target.value);
  };

  const filteredCountries = countries.filter((country) => {
    const nameMatch =
      country.name.toLowerCase().includes(searchQuery.toLowerCase());
    const regionMatch =
      regionFilter === "All" || country.region === regionFilter;
    return nameMatch && regionMatch;
  });

  return (
    <>
      <section className="filter">
        <form className="form-control">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search for a country"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </form>
        <div className="region-filter">
          <select
            name="select"
            id="select"
            className="select"
            value={regionFilter}
            onChange={handleRegionFilterChange}
          >
            <option value="All">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </section>

      <section className="grid">
        {filteredCountries.map((country) => {
          const { numericCode, name, population, region, capital, flag } = country;
          return (
            <article key={numericCode}>
              <div>
                <img src={flag} alt={name} />
                <div className="details">
                  <h3>{name}</h3>
                  <h4>
                    Population: <span>{population}</span>
                  </h4>
                  <h4>
                    Region: <span>{region}</span>
                  </h4>
                  <h4>
                    Capital: <span>{capital}</span>
                  </h4>
                  <Link to={`/countries/${name}`} className="learn-more">
                    Learn More
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default Countries;

import React, { useState, ChangeEvent } from "react";
import { Link } from 'react-router-dom';
import useCountryData from "./useCountryData";

interface Country {
  numericCode: string;
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
}

const Countries: React.FC = () => {
  const { countries, loading, error } = useCountryData("https://restcountries.com/v2/all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [regionFilter, setRegionFilter] = useState<string>("All");

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <>
      <section className="filter">
        <form className="form-control">
            <i
              className="search-icon fas fa-search"
              onClick={() => document.getElementById("search")?.focus()}
            ></i>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search for a country..."
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
          const { numericCode, name, population, region, capital, flag } =
            country;
          
          return (
            <Link to={`/countries/${name}`} key={numericCode}>
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
  </div>
</div>
</article>
          </Link>
           
          );
        })}
      </section>
    </>
  );
};

export default Countries;



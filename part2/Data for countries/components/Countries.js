import React from "react";

const Countries = (props) => {
  let { countries } = props;
  console.log(countries);

  const showCountries = () => {
    if (countries.length === 1) {
      return countries.map((country) => (
        <div key={country.name}>
          <h1>{country.name}</h1>
          <p>capital: {country.capital}</p>
          <p>population: {country.population}</p>
          <h3>languages</h3>
          <ul>
            {country.languages.map((item) => (
              <div key={item.name}>
                <li>{item.name}</li>
              </div>
            ))}
          </ul>
          <img src={country.flag} alt={country.name} width='300px'/>
        </div>
      ));
    } else if (countries.length < 10) {
      return countries.map((country) => (
        <div key={country.name}>
          <p>{country.name}</p>
        </div>
      ));
    } else {
      return <p>Too many matches, specify another filter</p>;
    }
  };

  return <div>{showCountries()}</div>;
};

export default Countries;

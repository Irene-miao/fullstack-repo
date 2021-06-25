import React from "react";

const Country = (props) => {
  let { country } = props;
  console.log(country);
  return (
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
      <img src={country.flag} alt={country.name} width="300px" />
    </div>
  );
};

export default Country;

import React, { useState } from "react";
import Country from "./Country";

const Countries = (props) => {
  let { countries } = props;
  console.log(countries);
  const [showAll, setShowAll] = useState(true);

  const showCountries = () => {
    if (countries.length === 1) {
      return countries.map((country) => (
      <Country country={country} />))
    } else if (countries.length < 10) {
      return countries.map((country) => (
        <div key={country.name}>
          {country.name}
          <button onClick={() => setShowAll(!showAll)}>show</button>
          {showAll ? null : <Country country={country} />}
        </div>
      ));
    } else {
      return <p>Too many matches, specify another filter</p>;
    }
  };

  return <div>{showCountries()}</div>;
};

export default Countries;
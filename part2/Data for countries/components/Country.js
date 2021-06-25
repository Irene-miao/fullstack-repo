import React from "react";

const Country = (props) => {
  let { country } = props;
  let { info } = props;
  console.log(country);
  console.log(info);
  const weather = info.current;
  console.log(weather.condition);

  return (
    <div key={country.name}>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>Spoken languages</h3>
      <ul>
        {country.languages.map((item) => (
          <div key={item.name}>
            <li>{item.name}</li>
          </div>
        ))}
      </ul>
      <img src={country.flag} alt={country.name} width="300px" />
      <h3>Weather in {country.capital}</h3>
      <div>
        <p>
          <strong>temperature:</strong>
          {weather.temp_c} Celcius
        </p>
        <img src={weather.condition.icon} alt={weather.condition.text} />
        <p>
          <strong>wind:</strong>
          {weather.wind_mph} mph direction {weather.wind_dir}
        </p>
      </div>
    </div>
  );
};

export default Country;

import React, {useState, useEffect} from 'react';
import './App.css';
import Filter from './components/Filter';
import Countries from './components/Countries';
import axios from 'axios';

function App() {
const [countries, setCountries] = useState([]);
const [search, setSearch] = useState([]);
const [weather, setWeather] = useState([]);



useEffect(() => {
  axios
  .get('https://restcountries.eu/rest/v2/all')
  .then(response => {
    console.log(response.data);
    setCountries(response.data);
  })
}, []);

useEffect(() => {
  axios
  .get(`http://api.weatherapi.com/v1/current.json?key=82d440a5c7d746b1ae5105814212506&q=${search}`)
  .then(response => {
    console.log(response.data);
    setWeather(response.data);
  })
}, [search]);

const handleSearchChange = (event) => {
console.log(event.target.value);
const value = event.target.value;
setSearch(value.toLowerCase());
};

console.log(search);
  const match = countries.filter((country) => country.name.toLowerCase().includes(search));
  console.log(match);
 console.log(weather);





  return (
    <div className="App">
     <Filter value={search} onChange={handleSearchChange}/>
  <Countries countries={match} info={weather}/>
    </div>
  );
}

export default App;
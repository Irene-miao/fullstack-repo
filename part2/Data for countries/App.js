import React, {useState, useEffect} from 'react';
import './App.css';
import Filter from './components/Filter';
import Countries from './components/Countries';
import axios from 'axios';

function App() {
const [countries, setCountries] = useState([]);
const [search, setSearch] = useState([]);



useEffect(() => {
  axios
  .get('https://restcountries.eu/rest/v2/all')
  .then(response => {
    console.log(response.data);
    setCountries(response.data);
  })
}, []);


const handleSearchChange = (event) => {
console.log(event.target.value);
setSearch(event.target.value);
};


  const match = countries.filter((country) => country.name.toLowerCase().includes(search));
  console.log(match);
 





  return (
    <div className="App">
     <Filter value={search} onChange={handleSearchChange}/>
  <Countries countries={match}/>
    </div>
  );
}

export default App;

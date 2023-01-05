import { useEffect, useState } from "react";
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => (setCountries(res.data)))
  }, [])
  
  const filteredArray = countries.filter((country => {
    return country.name.common.toLowerCase().slice(0, filter.length) === filter.toLowerCase()
  }))

  const arrayToRender = filteredArray.map(country => 
  <p> {country.name.common} </p>) 

  const handleChange = (event) => {
    setFilter(event.target.value)
  }
  
  return (
    <div className="App">
      <h2>Data for countries</h2>
      Find countries <input onChange={handleChange} value={filter}/>
      <div>
        {filter ? arrayToRender : "No coincidences-"}
      </div>
    </div>
  );
}

export default App;

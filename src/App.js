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

  let outputToRender = []

  if(filteredArray.length === 0){
    outputToRender = ["No coincidences"]
  }
  else if(filteredArray.length === 1){
    outputToRender = filteredArray.map((country) => {
      return (
        <div key={country.name.common}>
          <h2>{country.name.common}</h2>
          <p>{country.capital}</p>
          <p>{country.area} m2</p>
          <p>{country.region}</p>
          <h2>Flag</h2>
          <img alt="" src={country.flags.png}></img> 
        </div>)
      })
    }
  else if(filteredArray.length <= 10){
    outputToRender = filteredArray.map((country) => <p key={country.name.common}> {country.name.common} </p>)
  }    
  else if(filteredArray.length > 10){
      outputToRender = ["Too many matches, specify another filter"]
  }
  


  const handleChange = (event) => {
    setFilter(event.target.value)
  }
  
  return (
    <div className="App">
      <h2>Data for countries</h2>
      Find countries <input onChange={handleChange} value={filter}/>
      <div>
        {filter ? outputToRender: "Type the name of a country" }
      </div>
    </div>
  );
}

export default App;

import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Results from './components/Results';
import Message from './components/Message';

function App() {
  const [countries, setCountries] = useState([])
  const [showHits, setShowHits] = useState(true)
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('Start writing a country name ...')
  const [hits, setHits] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
    let filteredCountries = countries.filter(country => 
      country.name.common.substring(0, event.target.value.length).toLowerCase() 
        === event.target.value.toLowerCase())
    if (filteredCountries.length === 0) {
      setShowHits(false)
      setMessage("No hits")
    }
    else if (filteredCountries.length === 1) {
      setShowHits(true)
      setMessage('')
      setHits(filteredCountries)
    }
    else if (filteredCountries.length > 11) {
      setShowHits(false)
      setMessage("There are too many hits")
    }
    else {
      setShowHits(true)
      setMessage('')
      setHits(filteredCountries)
    }
  }
  const hitsToShow = showHits
    ? hits
    : []

  return (
    <div className="App">
      <h1>Country Finder</h1>
      <Filter filter={filter} handleFilter={handleFilter} />
      <Message message={message} />
      <Results hitsToShow={hitsToShow} setHits={setHits} />
    </div>
  );
}

export default App;

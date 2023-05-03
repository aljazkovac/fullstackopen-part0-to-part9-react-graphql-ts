import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name === '') {
      setCountry({ found: null })
      return
    }
    axios
      .get(`https://restcountries.com/v3.1/name/${name}`)
      .then(response => {
        console.log('countries promise fulfilled')
        let countryData = {
          info: response.data,
          found: true
        }
        setCountry(countryData)
      })
      .catch(error => {
        let countryData = {
          info: null,
          found: false
        }
        setCountry(countryData)
      })
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (country.found === null) {
    return <div>enter country name</div>;
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  const { 
    name: countryName, 
    capital: countryCapital, 
    population: countryPopulation,
    flags: countryFlag, 
    ...countryOtherInfo
  } = country.info[0];

  return (
    <div>
      <h3>{countryName.common} </h3>
      <div>capital {countryCapital} </div>
      <div>population {countryPopulation}</div> 
      <img src={countryFlag.png} height='100' alt={`flag of ${countryName.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
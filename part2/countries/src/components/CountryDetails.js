import { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherWidget from './WeatherWidget';
const api_key = process.env.REACT_APP_API_KEY

const CountryDetails = ( { country } ) => {
    const [weather, setWeather] = useState([])
    const [weatherRendered, setWeatherRendered] = useState(false)
    const countryLat = country.latlng[0]
    const countryLon = country.latlng[1]

    useEffect(() => {
        console.log('CountryDetails effect')
        axios
          .get(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${countryLat}&lon=${countryLon}&units=metric&exclude=hourly,daily&appid=${api_key}`
            )
          .then(response => {
            console.log('weather promise fulfilled')
            setWeather(response.data)
            setWeatherRendered(true)
          })
      }, [countryLat, countryLon])
    const languages = Object.entries(country.languages)
    const flagUrl = Object.entries(country.flags)[0][1]
    const showWeather = weatherRendered
      ? weather
      : []
    return (
    <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <p>Languages: </p>
        <ul> 
            {languages.map(c => 
                <li key={c[0]}>{c[1]}</li>
            )} 
        </ul>
        <img src={flagUrl} alt="Country flag" />
        <h2>Weather in {country.capital} now</h2>
        <WeatherWidget showWeather={showWeather} />
    </div>
    )
}
 
export default CountryDetails 
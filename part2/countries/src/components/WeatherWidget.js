const WeatherWidget = ( { showWeather }) => {
    if (showWeather.length === 0 ) {
        return (
            <div>
                <p>Fetching weather ...</p>
            </div>
        )
    }
    console.log("Weather icon code = ", showWeather.current.weather[0].icon)
    return (
    <div>
        <p>Temperature: {showWeather.current.temp} Celsius</p>
        <p>Wind speed: {showWeather.current.wind_speed} m/s</p>
        <img src={`http://openweathermap.org/img/wn/${showWeather.current.weather[0].icon}@2x.png`} alt="Weather icon" />
    </div>
    )
}
 

export default WeatherWidget
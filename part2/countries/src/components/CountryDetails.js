const CountryDetails = ( {country} ) => {
    const languages = Object.entries(country.languages)
    const flagUrl = Object.entries(country.flags)[0][1]
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
    </div>
    )
}
 
export default CountryDetails 
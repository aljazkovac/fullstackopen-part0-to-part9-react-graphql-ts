import Country from "./Country"
import CountryDetails from "./CountryDetails"

const Results = ( { hitsToShow } ) => {
    if (hitsToShow.length === 1) {
        return (
            <div>
                <CountryDetails country={hitsToShow[0]} />
            </div>
        )
    }
    return (
    <div>
    {hitsToShow.map(country => 
        <Country key={country.name.common} country={country} />
    )} 
    </div>
    )
}
 
export default Results
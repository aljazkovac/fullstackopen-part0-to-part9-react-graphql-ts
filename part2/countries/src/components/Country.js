function showCountryDetails(country) {
    console.log(`Hello, ${country.name.common}`);
}
const Country = ({ country, hitsToShow }) => (
    <>
        <td>{country.name.common}</td>
        <td><button onClick={() => showCountryDetails(country)}>Show</button></td>
    </>
)
export default Country
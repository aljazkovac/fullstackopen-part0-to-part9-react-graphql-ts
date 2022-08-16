function showCountryDetails(country, setHits) {
    // console.log(`Hello, ${country.name.common}`);
    setHits([country])
}
const Country = ({ country, setHits }) => (
    <>
        <td>{country.name.common}</td>
        <td><button onClick={() => showCountryDetails(country, setHits)}>Show</button></td>
    </>
)
export default Country
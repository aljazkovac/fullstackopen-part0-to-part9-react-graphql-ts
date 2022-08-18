import personService from "../services/Persons"

const Person = ({ person, deletePerson }) => (
    <p>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button><button>change</button></p>
)

export default Person


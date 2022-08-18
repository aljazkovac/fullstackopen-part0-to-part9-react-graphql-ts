import Person from "./Person"

const Entries = ( { entriesToShow, deleteEntry, updateEntry } ) => (
    <div>
      {entriesToShow.map(person => 
        <Person key={person.id} person={person} deletePerson={deleteEntry} updatePerson={updateEntry} />
      )} 
    </div>
)

export default Entries


import Person from "./Person"

const Entries = ( {entriesToShow} ) => (
    <div>
      {entriesToShow.map(person => 
        <Person key={person.id} person={person} />
      )} 
    </div>
)

export default Entries


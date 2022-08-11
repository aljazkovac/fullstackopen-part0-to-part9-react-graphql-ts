const PersonForm = ( {addPerson, newName, handleNewName,
                     newNumber, handleNewNumber} ) => (
      <form onSubmit={addPerson}>
        <tr>
            <td>
            Name: <input 
                value={newName}
                onChange={handleNewName} 
                    />
            </td>
            <td>
            Number: <input 
                value={newNumber}
                onChange={handleNewNumber}
                    />
            </td>
        </tr>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    )

export default PersonForm


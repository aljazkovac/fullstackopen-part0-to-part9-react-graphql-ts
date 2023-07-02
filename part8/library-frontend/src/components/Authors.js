import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_AUTHOR_BIRTHYEAR, ALL_AUTHORS } from "../queries";

const Authors = (props) => {
  const [birthYear, setBirthYear] = useState("");
  const result = useQuery(ALL_AUTHORS);
  const [chosenAuthor, setAuthorName] = useState("");
  const [editAuthorBirthYear] = useMutation(EDIT_AUTHOR_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors[0].message;
      props.setError(messages);
      setTimeout(() => {
        props.setError(null);
      }, 5000);
    },
  });

  if (result.loading) {
    return <div>loading...</div>;
  }
  const authors = result.data.allAuthors;
  console.log("Result: ", result);

  const validateBirthYear = (birthYear) => {
    // Get the current year
    const currentYear = new Date().getFullYear();
    // Parse the birth year to an integer
    const birthYearInt = parseInt(birthYear, 10);
    // Check if the birth year is valid
    if (isNaN(birthYearInt) || birthYearInt < 0 || birthYearInt > currentYear) {
      // Show an error message and return to stop the execution of the function
      props.setError(
        "Birth year must be a positive number and not greater than the current year."
      );
      setTimeout(() => {
        props.setError(null);
      }, 5000);
      return false;
    }
    return true;
  };

  const submit = async (event) => {
    event.preventDefault();
    if (validateBirthYear(birthYear)) {
      await editAuthorBirthYear({
        variables: {
          authorName: chosenAuthor,
          birthYear: parseInt(birthYear, 10),
        },
      });
      setBirthYear("");
    }
    setBirthYear("");
  };

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birth year</h2>
      author:
      <div>
        <form onSubmit={submit}>
          <select onChange={({ target }) => setAuthorName(target.value)}>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
          <div>
            birth year:
            <input
              value={birthYear}
              onChange={({ target }) => setBirthYear(target.value)}
            />
          </div>
          <button type="submit">update birth year</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;

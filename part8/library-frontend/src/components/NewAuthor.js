import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, CREATE_AUTHOR } from "../queries";

const NewAuthor = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [createAuthor] = useMutation(CREATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors[0].message;
      props.setError(messages);
      setTimeout(() => {
        props.setError(null);
      }, 5000);
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    await createAuthor({
      variables: {
        name: name,
        born: parseInt(born, 10),
      },
    });
    setName("");
    setBorn("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">create author</button>
      </form>
    </div>
  );
};

export default NewAuthor;

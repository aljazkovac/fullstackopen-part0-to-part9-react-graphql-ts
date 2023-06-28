import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS_AND_BOOKS, CREATE_AUTHOR_AND_BOOK } from "../queries";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createAuthorAndBook] = useMutation(CREATE_AUTHOR_AND_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS_AND_BOOKS }],
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

    await createAuthorAndBook({
      variables: {
        authorName: author,
        title,
        published: parseInt(published, 10),
        genres,
      },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;

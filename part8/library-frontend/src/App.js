import { useState, useEffect } from "react";
import {
  useApolloClient,
  useQuery,
  useSubscription,
  gql,
} from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewAuthor from "./components/NewAuthor";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import { ALL_AUTHORS, BOOK_ADDED } from "./queries";

// function that takes care of manipulating cache
export const updateCache = (cache, addedBook) => {
  cache.modify({
    fields: {
      allBooks: (existingBooks = []) => {
        const newBookRef = cache.writeFragment({
          data: addedBook,
          fragment: gql`
            fragment NewBook on Book {
              id
              title
              published
              author {
                name
                born
                bookCount
              }
              genres
            }
          `,
        });
        return [...existingBooks, newBookRef];
      },
    },
  });
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [error, setError] = useState("");
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token") || null
  );
  const resultAuthors = useQuery(ALL_AUTHORS);
  const [authors, setAuthors] = useState([]);

  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log("Data", data);
      if (data) {
        const bookAdded = data.data.bookAdded;
        console.log("Book added", bookAdded);
        window.alert(bookAdded.title + " added");
        updateCache(client.cache, bookAdded);
      } else {
        console.log("No new book data received");
      }
    },
  });

  useEffect(() => {
    if (resultAuthors.data) {
      setAuthors(resultAuthors.data.allAuthors);
    }
  }, [resultAuthors.data]);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        <Notification error={error} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={setError} />
      </div>
    );
  }

  return (
    <div>
      <Notification error={error} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add author")}>add author</button>
        <button onClick={() => setPage("add book")}>add book</button>
      </div>
      <button onClick={logout}>logout</button>
      <Authors
        show={page === "authors"}
        authors={authors}
        setError={setError}
      />
      <Books show={page === "books"} setError={setError} />
      <NewBook show={page === "add book"} setError={setError} />
      <NewAuthor show={page === "add author"} setError={setError} />
    </div>
  );
};

export default App;

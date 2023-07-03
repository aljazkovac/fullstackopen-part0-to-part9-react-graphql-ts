import { useState, useEffect } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import { ALL_AUTHORS } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [error, setError] = useState("");
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token") || null
  );
  const resultAuthors = useQuery(ALL_AUTHORS);
  const [authors, setAuthors] = useState([]);

  const client = useApolloClient();

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
        <button onClick={() => setPage("add")}>add book</button>
      </div>
      <button onClick={logout}>logout</button>
      <Authors
        show={page === "authors"}
        authors={authors}
        setError={setError}
      />
      <Books show={page === "books"} authors={authors} setError={setError} />
      <NewBook show={page === "add"} setError={setError} />
    </div>
  );
};

export default App;

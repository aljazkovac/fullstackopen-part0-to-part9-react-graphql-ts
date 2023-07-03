import React from "react";
import { ALL_BOOKS, ALL_GENRES } from "../queries";
import { useQuery } from "@apollo/client";
import Select from "react-select";

const Books = (props) => {
  const booksResult = useQuery(ALL_BOOKS);
  const genresResult = useQuery(ALL_GENRES);
  if (booksResult.loading || genresResult.loading) {
    return null;
  }
  const books = booksResult.data.allBooks;
  const genres = genresResult.data.allGenres;
  console.log("Genres result:", genresResult);
  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Filter books by author</h3>
        <Select
          isMulti
          name="filter-genre"
          options={props.authors.map((a) => ({ value: a.name, label: a.name }))}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
      <div>
        <h3>Filter books by genre</h3>
        <Select
          isMulti
          name="filter-genre"
          options={genres.map((g) => ({ value: g, label: g }))}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    </div>
  );
};

export default Books;

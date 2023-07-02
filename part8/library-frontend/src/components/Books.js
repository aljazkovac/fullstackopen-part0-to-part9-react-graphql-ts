import React from "react";
import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";
import Select from "react-select";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  if (result.loading) {
    return null;
  }
  const books = result.data.allBooks;
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
      <h3>Filter books by genre</h3>
      <Select
        isMulti
        name="filter-genre"
        options={books.map((b) => ({ value: b.title, label: b.title }))}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
  );
};

export default Books;

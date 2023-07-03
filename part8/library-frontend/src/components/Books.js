import React, { useState } from "react";
import { ALL_BOOKS, ALL_GENRES, ALL_BOOKS_FILTERED } from "../queries";
import { useQuery } from "@apollo/client";
import Select from "react-select";

const Books = (props) => {
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const { loading: booksLoading, data: booksData } = useQuery(ALL_BOOKS);
  const { loading: genresLoading, data: genresData } = useQuery(ALL_GENRES);
  const {
    loading: filteredBooksLoading,
    data: filteredBooksData,
    refetch: refetchFilteredBooks,
  } = useQuery(ALL_BOOKS_FILTERED, {
    variables: { authors: selectedAuthors, genres: selectedGenres },
    skip: !selectedAuthors.length && !selectedGenres.length,
  });

  const handleAuthorsChange = (selectedOption) => {
    const authors = selectedOption
      ? selectedOption.map((option) => option.value)
      : [];
    setSelectedAuthors(authors);
    refetchFilteredBooks({ authors, genres: selectedGenres });
  };

  const handleGenresChange = (selectedOption) => {
    const genres = selectedOption
      ? selectedOption.map((option) => option.value)
      : [];
    setSelectedGenres(genres);
    refetchFilteredBooks({ authors: selectedAuthors, genres });
  };

  if (booksLoading || genresLoading || filteredBooksLoading) {
    return null;
  }

  const books = filteredBooksData
    ? filteredBooksData.allBooksFiltered
    : booksData.allBooks;
  const genres = genresData.allGenres;

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
          name="filter-author"
          options={props.authors.map((a) => ({ value: a.name, label: a.name }))}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleAuthorsChange}
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
          onChange={handleGenresChange}
        />
      </div>
    </div>
  );
};

export default Books;

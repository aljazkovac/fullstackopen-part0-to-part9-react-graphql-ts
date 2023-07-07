import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
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
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

// TODO: Use fragment
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
        born
        bookCount
      }
      genres
      id
    }
  }
`;

export const ALL_BOOKS_FILTERED = gql`
  query allBooksFiltered($authors: [String], $genres: [String]) {
    allBooksFiltered(authors: $authors, genres: $genres) {
      title
      published
      author {
        name
        born
        bookCount
      }
      genres
      id
    }
  }
`;

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $authorName: String!
    $title: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      author: $authorName
      title: $title
      published: $published
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      genres
      id
    }
  }
`;

export const CREATE_AUTHOR = gql`
  mutation createAuthor($name: String!, $born: Int) {
    addAuthor(name: $name, born: $born) {
      name
      born
      bookCount
      id
    }
  }
`;

export const EDIT_AUTHOR_BIRTHYEAR = gql`
  mutation editAuthorBirthYear($authorName: String!, $birthYear: Int!) {
    editAuthor(name: $authorName, setBornTo: $birthYear) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

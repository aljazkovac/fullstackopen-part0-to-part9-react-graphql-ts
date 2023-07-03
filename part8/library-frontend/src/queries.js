import { gql } from "@apollo/client";

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

// TODO: ALL_BOOKS_FILTERED

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

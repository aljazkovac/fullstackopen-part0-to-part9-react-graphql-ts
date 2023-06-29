import { gql } from "@apollo/client";

export const ALL_AUTHORS_AND_BOOKS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
    allBooks {
      title
      published
      author
      id
    }
  }
`;

export const CREATE_AUTHOR_AND_BOOK = gql`
  mutation createAuthorAndBook(
    $authorName: String!
    $title: String!
    $published: Int!
    $genres: [String!]!
  ) {
    createAuthorAndBook(
      authorName: $authorName
      title: $title
      published: $published
      genres: $genres
    ) {
      author {
        name
        born
        bookCount
        id
      }
      book {
        title
        published
        author
        genres
        id
      }
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

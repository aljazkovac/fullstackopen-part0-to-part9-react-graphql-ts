const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type AuthorAndBook {
    author: Author!
    book: Book!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    createAuthorAndBook(
      authorName: String!
      title: String!
      published: Int!
      genres: [String!]!
    ): AuthorAndBook
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      return Book.find({ author: args.author });
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      return Book.countDocuments({ author: root.name });
    },
  },
  Mutation: {
    addBook: (root, args) => {
      if (Book.find({ title: args.title })) {
        throw new GraphQLError("Title must be unique", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });
      }
      const book = { ...args, id: uuid() };
      let books = Book.find({});
      books = books.concat(book);
      let authors = Author.find({});
      if (!authors.find((a) => a.name === args.author)) {
        const author = { name: args.author };
        authors = authors.concat(author);
      }
      return book;
    },
    createAuthorAndBook: (root, args) => {
      let books = Book.find({});
      if (books.find((b) => b.title === args.title)) {
        throw new GraphQLError("Title must be unique", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });
      }
      const book = { ...args, author: args.authorName, id: uuid() };
      books = books.concat(book);
      let authors = Author.find({});
      let author = authors.find((a) => a.name === args.authorName);
      if (!author) {
        author = { name: args.authorName, id: uuid() };
        authors = authors.concat(author);
      }
      return { author, book };
    },
    editAuthor: (root, args) => {
      let authors = Author.find({});
      const author = authors.find((a) => a.name === args.name);
      if (!author) {
        return null;
      }
      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a));
      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

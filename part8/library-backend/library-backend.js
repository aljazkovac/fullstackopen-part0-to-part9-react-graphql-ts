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
    addAuthor(
      name: String!
      born: Int
    ): Author
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
      const filters = {};
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          throw new GraphQLError("Author not found", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
            },
          });
        }
        filters.author = author._id;
      }
      if (args.genre) {
        filters.genres = args.genre;
      }
      return Book.find(filters);
    },

    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async (author) => {
      return await Book.countDocuments({ author: author._id });
    },
  },
  Book: {
    author: async (book) => {
      return await Author.findById(book.author);
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const existingBook = await Book.find({ title: args.title });
      if (existingBook.length > 0) {
        throw new GraphQLError("Title must be unique", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });
      }

      const author = await Author.findOne({ name: args.author });
      if (!author) {
        throw new GraphQLError("Author must exist", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author,
          },
        });
      }

      const book = new Book({ ...args, author: author._id });
      await book.save();

      return book;
    },
    addAuthor: async (root, args) => {
      const existingAuthor = await Author.find({ name: args.name });
      if (existingAuthor.length > 0) {
        throw new GraphQLError("Author already exists", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }
      const author = new Author({ ...args });
      await author.save();
      return author;
    },
    editAuthor: async (root, args) => {
      const existingAuthor = await Author.findOne({ name: args.name });
      if (!existingAuthor) {
        throw new GraphQLError("Author does not exist.", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }
      existingAuthor.born = args.setBornTo;
      await existingAuthor.save();
      return existingAuthor;
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

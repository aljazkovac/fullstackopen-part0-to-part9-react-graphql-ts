const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
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
  type User {
    username: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
    allBooksFiltered(authors: [String], genres: [String]): [Book!]!
    allAuthors: [Author!]!
    allGenres: [String!]!
    me: User
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
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

const saveDocument = async (document) => {
  try {
    await document.save();
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessages = Object.values(error.errors).map(
        (e) => `${e.path}: ${e.message}`
      );
      const combinedErrorMessage = errorMessages.join(", ");

      throw new GraphQLError(combinedErrorMessage, {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: Object.keys(error.errors),
        },
      });
    }
    // if it's not a validation error, just re-throw the error
    throw error;
  }
};

const checkAuthentication = (context, errorMessage) => {
  if (!context.currentUser) {
    throw new GraphQLError(errorMessage, {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }
};

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async () => Book.find({}),
    allBooksFiltered: async (root, args) => {
      const filters = {};
      if (args.authors && args.authors.length > 0) {
        let authorIds = [];
        for (let i = 0; i < args.authors.length; i++) {
          const author = await Author.findOne({ name: args.authors[i] });
          if (!author) {
            throw new GraphQLError("Author not found", {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.authors[i],
              },
            });
          }
          authorIds.push(author._id);
        }
        filters.author = { $in: authorIds };
      }

      if (args.genres && args.genres.length > 0) {
        filters.genres = { $in: args.genres };
      }
      console.log("Filters: ", filters);
      return await Book.find(filters).populate("author");
    },
    allGenres: async () => {
      const books = await Book.find({});
      let genres = books.reduce((acc, b) => acc.concat(b.genres), []);
      const uniqueGenres = Array.from(new Set(genres));
      return uniqueGenres;
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
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
    addBook: async (root, args, context) => {
      checkAuthentication(context, "Only logged in users can add books.");
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
      await saveDocument(book);

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
      await saveDocument(author);
      return author;
    },
    editAuthor: async (root, args, context) => {
      checkAuthentication(context, "Only logged in users can edit authors.");
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
      await saveDocument(existingAuthor);
      return existingAuthor;
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  /*
  "During a GraphQL operation, you can share data throughout your server's resolvers and plugins 
  by creating an object named contextValue. You can pass useful things through your contextValue that 
  any resolver might need, like authentication scope, sources for fetching data, database connections, 
  and custom fetch functions. If you're using dataloaders to batch requests across resolvers, you can also 
  attach them to the shared contextValue."
  https://www.apollographql.com/docs/apollo-server/data/context/
  */
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    console.log("Auth in context server: ", auth);
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      console.log("Decoded token: ", decodedToken);
      const currentUser = await User.findById(decodedToken.id);
      console.log("Current user: ", currentUser);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

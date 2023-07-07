const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

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
      try {
        await saveDocument(book);
        console.log("Book saved", book);
      } catch (error) {
        throw new GraphQLError("Creating the book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      pubsub.publish("BOOK_ADDED", { bookAdded: book });
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
  Subscription: {
    bookAdded: {
      // CONVENTION: The iterator name is the subscription name in all caps
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;

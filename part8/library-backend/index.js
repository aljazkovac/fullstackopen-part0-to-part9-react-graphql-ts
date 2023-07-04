const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;
typeDefs = require("./schema");
resolvers = require("./resolvers");

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

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

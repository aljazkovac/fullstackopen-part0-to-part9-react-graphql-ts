// Desc: Main entry point for the backend

// ====================================================
// ==================== Imports =======================
// ====================================================

// Environment variables
require("dotenv").config();

// Web socket and server setup
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { ApolloServer } = require("@apollo/server");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");

// Express and HTTP server setup
const express = require("express");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const http = require("http");

// Authentication setup
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// MongoDB setup
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
const User = require("./models/user");


// GraphQL setup
const { makeExecutableSchema } = require("@graphql-tools/schema");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

console.log("connecting to", MONGODB_URI);

// ====================================================
// ================= DB CONNECTION ====================
// ====================================================

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

mongoose.set("debug", true);

// ====================================================
// ===================== SERVER =======================
// ====================================================

// Start function to setup the server
const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  // Setup WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  // Setup GraphQL schema
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  // Setup Apollo server
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  // Middleware and authentication setup
  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith("bearer ")) {
          const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
          const currentUser = await User.findById(decodedToken.id);
          console.log("currentUser", currentUser);
          return { currentUser };
        }
      },
    })
  );

  const PORT = 4000;

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  );
};

start();

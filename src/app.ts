import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose, { connect, ConnectOptions } from "mongoose";
//import { executableSchema as schema } from "./graphql/schema";
// import resolvers from "./graphql/resolvers/index";
import resolvers from "./graphql/resolvers/index";
import typeDefs from "./graphql/schema";
import { config } from "dotenv";
config();

export default class App {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.connectToMongo();
    this.initializeApollo();
  }

  private connectToMongo() {
    // const DB_url = "mongodb://localhost:27017/app";
    const DB_url=process.env.DATABASE_URL;
    mongoose.set("strictQuery", true);
    connect(DB_url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions)
      .then(() => {
        console.log("Connected to MongoDB...");
      })
      .catch((e) => {
        console.error("There was an error connecting to MongoDB:");
        console.error(e);
      });
  }

  private async initializeApollo() {
    const server = new ApolloServer({
      //schema,

      typeDefs,
      resolvers,
      context: async ({ req }) => ({ token: req.headers.authorization }),
    });

    this.app.get("/", (_, res) => {
      res.status(200).send("OK");
    });
    await server.start();

    server.applyMiddleware({ app: this.app });
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

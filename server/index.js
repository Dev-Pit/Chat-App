//* Load environment variables from .env file first
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/index.js";
import app from "./app.js";

const PORT = process.env.PORT;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

if (!(PORT || MONGO_CONNECTION_STRING)) {
  console.error(
    `\nSERVER: Not found port : ${PORT} or connection url : ${MONGO_CONNECTION_STRING} `
  );
} else {
  main();
}

async function main() {
  connectDB()
    .then(() => {
      console.info(`\nSERVER: Mongoose connection established`);
      app.listen(PORT, () =>
        console.info(`\nServer listening on port: ${PORT}`)
      );
    })
    .catch(console.error);
}

//* Load environment variables from .env file first
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
export const SECRET_KEY = process.env.SECRET_KEY;

console.log("PORT:", PORT); // Add this line
console.log("MONGO_CONNECTION_STRING:", MONGO_CONNECTION_STRING); // Add this line

if (!PORT) {
  console.error(`\nSERVER: Not found port : ${PORT} `);
} else if (!MONGO_CONNECTION_STRING) {
  console.error(
    `\nSERVER: Not found MONGO connection url ${MONGO_CONNECTION_STRING}`
  );
} else {
  main();
}

async function main() {
  await mongoose
    .connect(MONGO_CONNECTION_STRING)
    .then(() => {
      console.info(`\nSERVER: Mongoose connection established`);
      app.listen(PORT, () =>
        console.info(`\nServer listening on port: ${PORT}`)
      );
    })
    .catch(console.error);
}

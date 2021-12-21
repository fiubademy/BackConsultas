const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://admin:admin@cluster0.ji51a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

async function main() {
  mongoose
    .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("mongodb connection up"))
    .catch((error) =>
      console.log(`unable to connect to mongodb: ${error.message}`)
    );
}

module.exports = {
  startDB: main,
};

const options = {
  connect: (client, dc, isFresh) => {
    console.log("Connected to database:", client.connectionParameters.database);
  },
  query: e => {
    console.log("making query ========> " + e.query);
  },
  receive: (data, result, e) => {
    console.log("completed query =======> " + e.query);
  },
  disconnect: (client, dc) => {
    console.log(
      "Disconnecting from database:",
      client.connectionParameters.database
    );
  }
};

const pgp = require("pg-promise")(options);

let db;

if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  db = pgp({
    database: "todolist_development",
    port: 5432,
    host: "localhost"
  });
} else if (process.env.NODE_ENV === "production") {
  db = pgp(process.env.DATABASE_URL);
}

module.exports = db;

// Imports
import { Sequelize } from "sequelize";
import chalk from "chalk";

// App Imports
// import { NODE_ENV } from "../config/env";
// import databaseConfig from "../config/database.json";

// Load database config
// const databaseConfigEnv = databaseConfig[NODE_ENV];

// Create new database connection for Heroku process.env.DATABASE_URL
const connection = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Create new database connection
// const connection = new Sequelize(
//   databaseConfigEnv.database,
//   databaseConfigEnv.username,
//   databaseConfigEnv.password,
//   {
//     host: databaseConfigEnv.host,
//     dialect: databaseConfigEnv.dialect,
//     logging: console.log,
//     port: databaseConfigEnv.port,
//   }
// );

// Test connection
//console.info("SETUP - Connecting database...", databaseConfigEnv.port);

connection
  // .sync({
  //     force: true
  // })
  .authenticate()
  .then(() => {
    console.info(chalk.green.inverse.bold("INFO - Database connected."));
  })
  .catch((err) => {
    console.error(
      chalk.red.bgGreen.bold("ERROR - Unable to connect to the database:", err)
    );
  });

export default connection;

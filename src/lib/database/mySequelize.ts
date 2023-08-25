import { Sequelize } from "sequelize";

import error_message from "../error_message";

const mySequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string,
    dialect: "mysql",
    port: 6582,
    dialectModule: require("mysql2"),
  }
);

mySequelize
  .authenticate()
  .then(() => console.log("MySQL Database Connected."))
  .catch((error) =>
    console.log("ERROR::", error?.message || "Database Connection Error!")
  );

mySequelize.sync();

export const connectDB = async () => {
  try {
    mySequelize.authenticate();
    console.log("Database Connected!");
  } catch (error) {
    console.log("MySQL Connection ERROR::", error_message(error));
  }
};

export default mySequelize;

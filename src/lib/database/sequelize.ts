import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
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

sequelize
  .authenticate()
  .then(() => console.log("MySQL Database Connected."))
  .catch((error) =>
    console.log("ERROR::", error?.message || "Database Connection Error!")
  );

sequelize.sync();

export default sequelize;

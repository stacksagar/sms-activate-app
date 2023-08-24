import error_message from "../error_message";
import sequelize from "./sequelize";

export const connectDB = async () => {
  try {
    sequelize.authenticate();
    console.log("Database Connected!");
  } catch (error) {
    console.log("MySQL Connection ERROR::", error_message(error));
  }
};

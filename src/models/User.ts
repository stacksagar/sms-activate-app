import sequelize from "@/lib/database/sequelize";
import { Model, DataTypes, Optional } from "sequelize";

class User extends Model<UserT, Optional<UserT, "id">> {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    balance: { type: DataTypes.INTEGER, defaultValue: 0 },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    role: {
      type: DataTypes.ENUM("user", "mode", "admin"),
      defaultValue: "user",
    },
  },

  { tableName: "Users", sequelize }
);

export default User;

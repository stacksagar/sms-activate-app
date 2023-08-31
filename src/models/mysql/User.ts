import mySequelize from "@/lib/database/mySequelize";
import { Model, DataTypes, Optional } from "sequelize";

class User extends Model<Optional<UserT, "_id" | "createdAt" | "updatedAt">> {}

User.init(
  {
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

  { tableName: "Users", sequelize: mySequelize }
);

export default User;

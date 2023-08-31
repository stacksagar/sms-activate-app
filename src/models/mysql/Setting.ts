import mySequelize from "@/lib/database/mySequelize";
import { Model, DataTypes, Optional } from "sequelize";

class Setting extends Model<
  Optional<SettingT, "_id" | "createdAt" | "updatedAt">
> {}

Setting.init(
  {
    header: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    footer: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    seo: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    public: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    private: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },

  { tableName: "Settings", sequelize: mySequelize }
);

export default Setting;

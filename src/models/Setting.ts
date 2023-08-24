import sequelize from "@/lib/database/sequelize";
import { Model, DataTypes, Optional } from "sequelize";

class Setting extends Model<SettingT, Optional<SettingT, "id">> {}

Setting.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

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

  { tableName: "Settings", sequelize }
);

export default Setting;

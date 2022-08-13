import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"

// User Schema
export const User = sequelize.define(
  "users",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_email: {
      type: DataTypes.STRING,
    },
    user_is_staff: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    last_login: {
      type: DataTypes.DATE,
    },
    password: {
      type: DataTypes.CHAR,
    },
    username: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
)

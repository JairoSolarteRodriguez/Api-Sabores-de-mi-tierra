import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"

// User Schema
export const User = sequelize.define("users", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
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
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  user_restricted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  user_blocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
},{
  timestamps: true,
})

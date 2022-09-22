import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"

// User Schema
export const User = sequelize.define("users", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  userIsStaff: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userIsAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  lastLogin: {
    type: DataTypes.DATE,
  },
  password: {
    type: DataTypes.CHAR,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userIsActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  userRestricted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userBlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
},{
  timestamps: true,
})

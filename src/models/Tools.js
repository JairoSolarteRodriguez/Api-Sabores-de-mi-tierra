import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"


export const Tools = sequelize.define("tools", {
  toolId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  toolName: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  timestamps: true,
})

import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"


export const Tools = sequelize.define("tools", {
  tool_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  tool_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  timestamps: true,
})

import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"


export const Measures = sequelize.define("measures", {
  measureId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  measureSufix: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  timestamps: true,
})

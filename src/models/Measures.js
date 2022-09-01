import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"


export const Measures = sequelize.define("measures", {
  measure_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  measure_sufix: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  timestamps: true,
})

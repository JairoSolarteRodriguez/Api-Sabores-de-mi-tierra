import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"


export const Prices = sequelize.define("prices", {
  price_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  price_sufix: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  timestamps: true,
})

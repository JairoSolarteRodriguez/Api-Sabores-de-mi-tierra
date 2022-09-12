import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"


export const Prices = sequelize.define("prices", {
  priceId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  priceSufix: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
})

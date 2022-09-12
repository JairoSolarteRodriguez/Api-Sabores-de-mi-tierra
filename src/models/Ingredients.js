import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"


export const Ingredients = sequelize.define("ingredients", {
  ingredientId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  ingredientName: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  timestamps: true,
})

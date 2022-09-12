import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"


export const Categories = sequelize.define("categories", {
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  timestamps: true,
})

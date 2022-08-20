import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"


export const Categories = sequelize.define("categories", {
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  timestamps: true,
})

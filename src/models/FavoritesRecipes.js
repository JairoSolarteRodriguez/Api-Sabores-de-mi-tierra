import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"
import { User } from "./Users.js"

export const FavoritesRecipes = sequelize.define("favorite_recipes",{
  favorites_recipes_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  }
},{
  timestamps: true,
})
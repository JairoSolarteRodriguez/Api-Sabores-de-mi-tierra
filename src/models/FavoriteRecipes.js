import { DataTypes } from "sequelize"

import { sequelize } from "../db/db.js"
import { User } from "./Users.js"
import { Recipes } from "./Recipes.js"

export const FavoriteRecipes = sequelize.define('favorite_recipes', {
  favorite_recipe_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
})

User.belongsToMany(Recipes, { through: FavoriteRecipes })
Recipes.belongsToMany(User, { through: FavoriteRecipes })
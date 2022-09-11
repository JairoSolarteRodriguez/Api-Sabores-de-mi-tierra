import { DataTypes } from "sequelize"

import { sequelize } from "../db/db.js"
import { Recipes } from "./Recipes.js"
import { Categories } from "./Categories.js"

export const RecipeCategories = sequelize.define('recipe_categories', {
  recipe_category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
})

Recipes.belongsToMany(Categories, { through: RecipeCategories })
Categories.belongsToMany(Recipes, { through: RecipeCategories })
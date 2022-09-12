import { DataTypes } from "sequelize"

import { sequelize } from "../db/db.js"
import { Steps } from "./Steps.js"
import { Recipes } from "./Recipes.js"

export const StepRecipes = sequelize.define('step_recipes', {
  stepRecipeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
})

Steps.belongsToMany(Recipes, { through: StepRecipes })
Recipes.belongsToMany(Steps, { through: StepRecipes })
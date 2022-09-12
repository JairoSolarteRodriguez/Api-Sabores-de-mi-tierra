import { DataTypes } from "sequelize"

import { sequelize } from "../db/db.js"
import { Steps } from "./Steps.js"
import { Ingredients } from './Ingredients.js'

export const StepIngredients = sequelize.define('step_ingredients', {
  stepIngredientId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
})

Steps.belongsToMany(Ingredients, { through: StepIngredients })
Ingredients.belongsToMany(Steps, { through: StepIngredients })
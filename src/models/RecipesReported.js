import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"
import { Recipes } from "./Recipes.js"
import { User } from "./Users.js"

export const RecipesReported = sequelize.define("recipes_reported",{
  recipeReportedId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  recipeReportedComment: {
    type: DataTypes.STRING,
  },
  recipeReportedDate: {
    type: DataTypes.DATE,
  },
  recipeReportActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
},{
  timestamps: true,
})

//User
User.hasMany(RecipesReported,{
    foreignKey: 'userId',
    sourceKeys: 'recipeReportedId'
})

RecipesReported.belongsTo(User,{
    foreignKey: 'userId',
    targetId: 'recipeReportedId'
})

//User
Recipes.hasMany(RecipesReported,{
    foreignKey: 'recipeId',
    sourceKeys: 'recipeReportedId'
})

RecipesReported.belongsTo(Recipes,{
    foreignKey: 'recipeId',
    targetId: 'recipeReportedId'
})

import { DataTypes } from "sequelize"

import { sequelize } from "../db/db.js"
import { Recipes } from "./Recipes.js"
import { User } from "./Users.js"
import { Comments } from "./Comments.js"

export const CommentsRecipe = sequelize.define('comment_recipe', {
  commentRecipeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
})


Recipes.hasMany(CommentsRecipe)
CommentsRecipe.belongsTo(Recipes)

User.hasMany(CommentsRecipe)
CommentsRecipe.belongsTo(User)

Comments.hasOne(CommentsRecipe)

CommentsRecipe.belongsTo(Comments)
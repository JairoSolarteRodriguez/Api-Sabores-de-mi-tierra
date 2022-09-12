import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"
import { Recipes } from "./Recipes.js"
import { User } from "./Users.js"


export const Stars = sequelize.define("stars", {
    recipeStarsId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    recipeStartQuantity: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: true,
})

//User
User.hasMany(Stars,{
    foreignKey: 'userId',
    sourceKeys: 'recipeStarsId'
})

Stars.belongsTo(User,{
    foreignKey: 'userId',
    targetId: 'recipeStarsId'
})

//Recipes
Recipes.hasMany(Stars,{
    foreignKey: 'recipeId',
    sourceKeys: 'recipeStarsId'
})

Stars.belongsTo(Recipes,{
    foreignKey: 'recipeId',
    targetId: 'recipeStarsId'
})


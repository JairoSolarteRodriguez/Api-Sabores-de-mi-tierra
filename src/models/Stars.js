import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"
import { Recipes } from "./Recipes.js"
import { User } from "./Users.js"


export const Stars = sequelize.define("stars", {
    recipe_stars_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    recipe_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    recipe_start_quantity: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: true,
})

//User
User.hasMany(Stars,{
    foreignKey: 'user_id',
    sourceKeys: 'recipe_stars_id'
})

Stars.belongsTo(User,{
    foreignKey: 'user_id',
    targetId: 'recipe_stars_id'
})

//Recipes
Recipes.hasMany(Stars,{
    foreignKey: 'recipe_id',
    sourceKeys: 'recipe_stars_id'
})

Stars.belongsTo(Recipes,{
    foreignKey: 'recipe_id',
    targetId: 'recipe_stars_id'
})


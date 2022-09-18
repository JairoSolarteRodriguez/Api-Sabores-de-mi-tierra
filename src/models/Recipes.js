import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"
import { User } from "./Users.js"
import { Prices } from './Prices.js'
import { Dificult } from './Dificults.js'


export const Recipes = sequelize.define("recipes", {
    recipeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    priceId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    recipeDificult: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    recipeName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    recipePhoto: {
        type: DataTypes.STRING,
    },
    recipePortions: {
        type: DataTypes.INTEGER
    },
    recipeTime: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    recipeDescription: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    recipeRestricted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    recipeBlocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    recipePrivacity: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: true,
})

//User
User.hasMany(Recipes,{
    foreignKey: 'userId',
    sourceKeys: 'recipeId'
})

Recipes.belongsTo(User,{
    foreignKey: 'userId',
    targetId: 'recipeId'
})

//Price
Prices.hasOne(Recipes,{
    foreignKey: 'priceId',
    sourceKeys: 'recipeId'
})

Recipes.belongsTo(Prices,{
    foreignKey: 'priceId',
    targetId: 'recipeId'
})

//Dificult
Dificult.hasOne(Recipes,{
    foreignKey: 'recipeDificult',
    sourceKeys: 'recipeId'
})

Recipes.belongsTo(Dificult,{
    foreignKey: 'recipeDificult',
    targetId: 'recipeId'
})
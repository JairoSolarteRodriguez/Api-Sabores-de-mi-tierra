import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"
import { User } from "./Users.js"
import { Prices } from './Prices'
import { Dificults } from './Dificults'


export const Recipes = sequelize.define("recipes", {
    recipe_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    price_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    recipes_dificult: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    recipe_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    recipe_photo: {
        type: DataTypes.STRING,
    },
    recipe_portions: {
        type: DataTypes.INTEGER
    },
    recipe_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    recipe_date_pub: {
        type: DataTypes.DATE,
        allowNull: false
    },
    recipe_description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    recipe_restricted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    recipe_blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    recipe_privacity: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: true,
})

//User
User.hasMany(Recipes,{
    foreignKey: 'user_id',
    sourceKeys: 'recipe_id'
})

Recipes.belongsTo(User,{
    foreignKey: 'user_id',
    targetId: 'recipe_id'
})

//Price
Prices.hasOne(Recipes,{
    foreignKey: 'price_id',
    sourceKeys: 'recipe_id'
})

Recipes.belongsTo(Prices,{
    foreignKey: 'price_id',
    targetId: 'recipe_id'
})

//Dificult
Dificults.hasOne(Recipes,{
    foreignKey: 'recipes_dificult',
    sourceKeys: 'recipe_id'
})

Recipes.belongsTo(Dificults,{
    foreignKey: 'recipes_dificult',
    targetId: 'recipe_id'
})
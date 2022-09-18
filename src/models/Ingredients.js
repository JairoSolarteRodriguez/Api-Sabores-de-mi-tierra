import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"
import { Measures } from './Measures.js'


export const Ingredients = sequelize.define("ingredients", {
  ingredientId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  ingredientName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  timestamps: true,
})

Measures.hasOne(Ingredients, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'measureId',
})

Ingredients.belongsTo(Measures, {
  foreignKey: 'measureId',
  targetId: 'measureId'
})
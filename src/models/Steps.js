import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"

export const Steps = sequelize.define("steps", {
  stepId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  stepNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stepImage: {
    type: DataTypes.TEXT,
  },
  stepDescription: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: true,
})
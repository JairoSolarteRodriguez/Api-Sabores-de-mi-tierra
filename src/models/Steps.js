import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"

export const Steps = sequelize.define("steps", {
  step_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  step_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  step_image: {
    type: DataTypes.TEXT,
  },
  step_description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: true,
})
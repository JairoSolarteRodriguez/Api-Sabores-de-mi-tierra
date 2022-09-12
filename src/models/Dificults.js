import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"


export const Dificult = sequelize.define("dificult", {
  dificultId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  dificultName: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  timestamps: true,
})

import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"


export const Dificult = sequelize.define("dificult", {
  dificult_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  dificult_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  timestamps: true,
})

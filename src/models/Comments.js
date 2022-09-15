import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"


export const Comments = sequelize.define("comment", {
  commentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  commentText: {
    type: DataTypes.STRING,
    allowNull: false
  },
  commentPhoto: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  timestamps: true,
})

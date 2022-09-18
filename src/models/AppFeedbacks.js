import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"
import { User } from "./Users.js"

export const AppFeedbacks = sequelize.define("app_feedbacks", {
  appFeedBackId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  appFeedbackComment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stars: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
},{
  timestamps: true,
})

User.hasOne(AppFeedbacks, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'userId',
})

AppFeedbacks.belongsTo(User, {
  foreignKey: 'userId',
  targetId: 'userId',
})
import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"
import { User } from "./Users.js"


// User Schema
export const UserReported = sequelize.define("users_reported",{
  user_reported_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_reported_comment: {
    type: DataTypes.STRING,
  },
  user_reported_date: {
    type: DataTypes.DATE,
  },
},{
  timestamps: true,
})

User.hasOne(UserReported, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'user_reported',
})

User.hasOne(UserReported, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'user_report',
})

UserReported.belongsTo(User, {
  foreignKey: 'user_reported',
  targetId: 'user_reported_id',
})

UserReported.belongsTo(User, {
  foreignKey: 'user_report',
  targetId: 'user_reported_id',
})

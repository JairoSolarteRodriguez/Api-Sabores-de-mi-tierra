import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"
import { User } from "./Users.js"

export const UserReported = sequelize.define("users_reported",{
  userReportedId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userReportedComment: {
    type: DataTypes.STRING,
  },
  userReportedDate: {
    type: DataTypes.DATE,
  },
  userReportActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
},{
  timestamps: true,
})

User.hasOne(UserReported, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'userReported',
})

User.hasOne(UserReported, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'userReport',
})

UserReported.belongsTo(User, {
  foreignKey: 'userReported',
  targetId: 'userReportedId',
})

UserReported.belongsTo(User, {
  foreignKey: 'userReport',
  targetId: 'userReportedId',
})

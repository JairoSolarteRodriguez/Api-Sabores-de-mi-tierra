import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"

import { User } from "./Users.js"

export const UserProfile = sequelize.define("users_profile", {
  profileId: {
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement: true,
  },
  score:{
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  profileName:{
    type: DataTypes.CHAR,
  },
  profileBirthDate:{
    type: DataTypes.DATE,
  },
  profilePhoto:{
    type: DataTypes.TEXT
  },
  userDescription:{
    type: DataTypes.TEXT(500)
  },
},{
  timestamps: true,
})

User.hasOne(UserProfile, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'userId',
})

UserProfile.belongsTo(User, {
  foreignKey: 'userId',
  targetId: 'profileId',
})
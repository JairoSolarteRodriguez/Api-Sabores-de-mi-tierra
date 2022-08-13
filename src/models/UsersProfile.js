import { DataTypes } from "sequelize"
import { sequelize } from "../db/db.js"

import { User } from "./Users.js"

export const UserProfile = sequelize.define("users_profile", {
  profile_id: {
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement: true,
  },
  profile_stars:{
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  profile_name:{
    type: DataTypes.CHAR,
  },
  profile_birth_date:{
    type: DataTypes.DATE,
  },
  profile_photo:{
    type: DataTypes.TEXT
  },
})

User.hasOne(UserProfile, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'user_id',
})

UserProfile.belongsTo(User, {
  foreignKey: 'user_id',
  targetId: 'profile_id',
})
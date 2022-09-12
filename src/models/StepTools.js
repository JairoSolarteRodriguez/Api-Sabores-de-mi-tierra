import { DataTypes } from "sequelize"

import { sequelize } from "../db/db.js"
import { Steps } from "./Steps.js"
import { Tools } from "./Tools.js"

export const StepTools = sequelize.define('step_tools', {
  stepToolId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
})

Steps.belongsToMany(Tools, { through: StepTools })
Tools.belongsToMany(Steps, { through: StepTools })
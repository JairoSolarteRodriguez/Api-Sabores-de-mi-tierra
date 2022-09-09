import { DataTypes } from "sequelize"

import { sequelize } from "../db/db.js"
import { Steps } from "./Steps.js"
import { Tools } from "./Tools.js"

const Step_Tools = sequelize.define('step_tools', {
  step_tool_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
})

Steps.belongsToMany(Tools, { through: Step_Tools })
Tools.belongsToMany(Steps, { through: Step_Tools })
import { DataTypes } from "sequelize"

import { sequelize } from "../db/db.js"
import { Steps } from "./Steps.js"
import { Measures } from "./Measures.js"

export const StepMeasures = sequelize.define('step_measures', {
  stepMeasureId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
})

Steps.belongsToMany(Measures, { through: StepMeasures })
Measures.belongsToMany(Steps, { through: StepMeasures })
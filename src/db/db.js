import Sequelize from "sequelize"
import "dotenv/config"

const {
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DIALECT,
  DATABASE_PORT,
} = process.env

export const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  {
    DATABASE_HOST,
    DATABASE_PORT,
    dialect: DIALECT,
  }
)
import Sequelize from "sequelize"
import "dotenv/config"

const {
  URL_CONNECTION, 
  // DATABASE_NAME,
  // DATABASE_USERNAME,
  // DATABASE_PASSWORD,
  // DATABASE_HOST,
  // DATABASE_PORT,
  // DIALECT,
} = process.env

// export const sequelize = new Sequelize(
//   DATABASE_NAME,
//   DATABASE_USERNAME,
//   DATABASE_PASSWORD,
//   {
//     DATABASE_HOST,
//     DATABASE_PORT,
//     dialect: DIALECT,
//   }
// )

export const sequelize = new Sequelize(URL_CONNECTION)
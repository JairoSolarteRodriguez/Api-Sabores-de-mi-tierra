import app from "./app.js"
import { sequelize } from "./db/db.js"

// import './models/Users.js'
// import './models/UsersProfile.js'
// import './models/UsersReported.js'

const PORT = process.env.PORT || 3000

async function main() {
  try {
    // await sequelize.sync({ force: true })
    await sequelize.sync()
    console.log("Connection has been established successfully.")
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (err) {
    console.error("Unable to connect to the database:", err)
  }
}

main()

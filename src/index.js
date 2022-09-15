import app from "./app.js"
import { sequelize } from "./db/db.js"

// import './models/Users.js'
// import './models/UsersProfile.js'
// import './models/UsersReported.js'
// import './models/Categories.js'
// import './models/Dificults.js'
// import './models/Ingredients.js'
// import './models/Prices.js'
// import './models/Tools.js'
// import './models/Measures.js'
// import './models/Steps.js'
// import './models/Recipes.js'
// import './models/StepTools.js'
// import './models/StepIngredients.js'
// import './models/StepMeasures.js'
// import './models/RecipeCategories.js'
// import './models/FavoriteRecipes.js'
// import './models/StepRecipes.js'
// import './models/Stars.js'
import './models/AppFeedbacks.js'

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

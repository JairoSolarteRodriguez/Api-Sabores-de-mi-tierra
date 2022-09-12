import { Categories } from '../../models/Categories.js'
import { RecipeCategories } from '../../models/RecipeCategories.js'

import { Tools } from '../../models/Tools.js'
import { StepTools } from '../../models/StepTools.js'

import { Ingredients } from '../../models/Ingredients.js'
import { StepIngredients } from '../../models/StepIngredients.js'

import { Steps } from '../../models/Steps.js'
import { StepRecipes } from '../../models/StepRecipes.js'

import { Recipes } from '../../models/Recipes.js'

import { sequelize } from '../../db/db.js'

export const createFullRecipe = async (req, res) => {
  try {
    const { price } = req.body //Prices
    const { tags } = req.body //Categories
    const { difficulty } = req.body //Dificult
    const { steps } = req.body //Steps
    const { userId } = req.body //User
    const { 
      description,
      imagePath,
      name,
      time,
      isPublic,
      portions
    } = req.body //Recipe
  
    if(!price || !tags || !difficulty || !steps || !userId || !description || !imagePath || !name || !time || !portions) return res.status(400).send({ message: `Por favor rellenar todos los campos` })
    
    const newRecipe = await Recipes.create({ // Save recipe
      user_id: userId,
      price_id: price,
      recipe_dificult: difficulty,
      recipe_name: name,
      recipe_photo: imagePath,
      recipe_portions: portions,
      recipe_time: time,
      recipe_description: description,
      recipe_privacity: isPublic
    })
  
    tags.map(async (tag) => { // save all categories
      const category = await Categories.create({
        category_name: tag
      })
      
      // Save relations recipes and categories in intermediate table
      await RecipeCategories.create({
        recipeRecipeId: newRecipe.dataValues.recipe_id,
        categoryCategoryId: category.dataValues.category_id
      })
    })
    
    steps.map(async (step) => {
      const { step_number, step_image, step_description, ingredients, tools } = step
  
      const getStep = await Steps.create({
        step_number,
        step_image,
        step_description
      })
  
      // Save ingredients and ingredient Step relations
      ingredients.map(async (ingredient) => {
        const newIngredient = await Ingredients.create({
          ingredient_name: ingredient
        })
  
        // Save relations steps and ingredients in intermediate table
        await StepIngredients.create({
          stepStepId: getStep.dataValues.step_id,
          ingredientIngredientId: newIngredient.dataValues.ingredient_id
        })
      })
  
      // Save tools and tools Steps relations
      tools.map(async (tool) => {
        const newTool = await Tools.create({
          tool_name: tool
        })
        
        // Save relations step and tools in intermediate table
        await StepTools.create({
          stepStepId: getStep.dataValues.step_id,
          toolToolId: newTool.dataValues.tool_id
        })
      })
  
      // Save relations step recipe in intermidiate table
      await StepRecipes.create({
        stepStepId: getStep.dataValues.step_id,
        recipeRecipeId: newRecipe.dataValues.recipe_id
      })
    })

    return res.status(200).send({ message: newRecipe.dataValues.recipe_id })

  } catch (error) {
    return res.status(500).send({ message: `Algo ocurrio ${error}`})
  }
}

export const getFullRecipeByRecipeId = async (req, res) => {
  const { recipe_id } = req.params

  const [ recipe ] = await sequelize.query(`
    SELECT u.user_id, u.username, up.profile_photo,  r.recipe_id, p.price_sufix, d.dificult_name, r.recipe_name, r.recipe_photo, r.recipe_portions, 
    r.recipe_time, r.recipe_description, r.recipe_privacity 
    FROM users u 
    JOIN users_profiles up ON u.user_id = up.user_id 
    JOIN recipes r ON u.user_id = r.user_id 
    JOIN prices p ON p.price_id = r.price_id 
    JOIN dificults d ON d.dificult_id = r.recipe_dificult 
    WHERE r.recipe_id = ${recipe_id}
  `)

  const [ steps ] = await sequelize.query(`
    SELECT * FROM step_recipes WHERE "recipeRecipeId" = ${recipe_id}
  `)



  return res.send({ recipe, steps })
}
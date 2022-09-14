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
      userId: userId,
      priceId: price,
      recipeDificult: difficulty,
      recipeName: name,
      recipePhoto: imagePath,
      recipePortions: portions,
      recipeTime: time,
      recipeDescription: description,
      recipePrivacity: isPublic
    })
  
    tags.map(async (tag) => { // save all categories
      const category = await Categories.create({
        categoryName: tag
      })
      
      // Save relations recipes and categories in intermediate table
      await RecipeCategories.create({
        recipeRecipeId: newRecipe.dataValues.recipeId,
        categoryCategoryId: category.dataValues.categoryId
      })
    })
    
    steps.map(async (step) => {
      const { stepNumber, stepImage, stepDescription, ingredients, tools } = step
  
      const getStep = await Steps.create({
        stepNumber,
        stepImage,
        stepDescription
      })
  
      // Save ingredients and ingredient Step relations
      ingredients.map(async (ingredient) => {
        const newIngredient = await Ingredients.create({
          ingredientName: ingredient
        })
  
        // Save relations steps and ingredients in intermediate table
        await StepIngredients.create({
          stepStepId: getStep.dataValues.stepId,
          ingredientIngredientId: newIngredient.dataValues.ingredientId
        })
      })
  
      // Save tools and tools Steps relations
      tools.map(async (tool) => {
        const newTool = await Tools.create({
          toolName: tool
        })
        
        // Save relations step and tools in intermediate table
        await StepTools.create({
          stepStepId: getStep.dataValues.stepId,
          toolToolId: newTool.dataValues.toolId
        })
      })
  
      // Save relations step recipe in intermidiate table
      await StepRecipes.create({
        stepStepId: getStep.dataValues.stepId,
        recipeRecipeId: newRecipe.dataValues.recipeId
      })
    })

    return res.status(200).send({ message: newRecipe.dataValues.recipeId })

  } catch (error) {
    return res.status(500).send({ message: `Algo ocurrio ${error}`})
  }
}

export const getFullRecipeByRecipeId = async (req, res) => {
  const { recipe_id } = req.params

  // GET recipe
  const [ recipe ] = await sequelize.query(`
    SELECT u."userId", u."userName", up."profilePhoto",  r."recipeId", r."createdAt", p."priceSufix", d."dificultName", r."recipeName", r."recipePhoto", r."recipePortions", 
    r."recipeTime", r."recipeDescription", r."recipePrivacity" 
    FROM users u 
    JOIN users_profiles up ON u."userId" = up."userId"
    JOIN recipes r ON u."userId" = r."userId" 
    JOIN prices p ON p."priceId" = r."priceId" 
    JOIN dificults d ON d."dificultId" = r."recipeDificult"
    WHERE r."recipeId" = ${recipe_id}
  `)

  // Get Steps
  const [ steps ] = await sequelize.query(`
    SELECT s."stepId", s."stepNumber", s."stepImage", s."stepDescription", s."createdAt" FROM step_recipes sr
    JOIN recipes r ON sr."recipeRecipeId" = r."recipeId"
    JOIN steps s ON sr."stepStepId" = s."stepId"
    WHERE sr."recipeRecipeId" = ${recipe_id} ORDER BY s."stepNumber"
  `)
  
  // Get categories
  const [ categories ] = await sequelize.query(`
    SELECT c."categoryId", c."categoryName" FROM recipe_categories rc  
    JOIN categories c ON rc."categoryCategoryId" = c."categoryId"
    WHERE rc."recipeRecipeId" = ${recipe_id}
  `)
  
  const stepsId = []
  const stepsData = []
  
  // Create json step data
  steps.map(async (step) => {
    stepsId.push(step.stepId)
    
    const [ tools ]  = await sequelize.query(`
      SELECT st."stepStepId", t."toolId", t."toolName" FROM step_tools st
      JOIN tools t ON st."toolToolId" = t."toolId" WHERE st."stepStepId" IN (${step.stepId})
    `)

    stepsData.push({
      id: step.stepId,
      number: step.stepNumber,
      imagePath: step.stepImage,
      description: step.stepDescription,
      createdAt: step.createdAt,
      // ingredients
      tools: tools
    })
  })

  // get all utincils by steps on recipes
  const [ allTools ] = await sequelize.query(`
    SELECT t."toolId", t."toolName" FROM step_tools st
    JOIN tools t ON st."toolToolId" = t."toolId" WHERE st."stepStepId" IN (${stepsId.map(s => s)})
  `)

  //Create json category data
  const tags = categories.map(category => ({
    categoryId: category.categoryId,
    name: category.categoryName
  }))
  
  const recipeData = recipe[0]

  // Get Recipe Score
  const [ score ] = await sequelize.query(`
    SELECT s."recipeId", AVG(s."recipeStartQuantity") score FROM stars s WHERE s."recipeId" = ${recipeData.recipeId} GROUP BY s."recipeId"
  `)

  const data = {
    recipeId: recipeData.recipeId,
    recipeCompleteTools: allTools,
    description: recipeData.recipeDescription,
    dificulty: recipeData.dificultName,
    imagePath: recipeData.recipePhoto,
    portions: recipeData.recipePortions,
    // ingredients
    name: recipeData.recipeName,
    price: recipeData.priceSufix,
    steps: stepsData,
    tags: tags,
    time: recipeData.recipeTime,
    score: score[0].score,
    // tools
    userId: recipeData.userId,
    userName: recipeData.userName,
    profileImagePath: recipeData.profilePhoto,
    isPrivate: recipeData.recipePrivacity,
    createdAt: recipeData.createdAt  
  }
  
  return res.send(data)
}
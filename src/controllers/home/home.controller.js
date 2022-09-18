import { Recipes } from "../../models/Recipes.js";

import { sequelize } from "../../db/db.js";

export const getBestRecipes = async (req, res) => {
  let { page, limit } = req.query;
  console.log(req.query);
  try {
    parseInt(limit);
    parseInt(page);
  } catch (error) {
    return error;
  }

  !limit ? (limit = 10) : limit;
  !page ? (page = 1) : page;

  try {
    // GET recipes
    const [recipe] = await sequelize.query(`
    SELECT r."recipeId", r."recipeName", d."dificultName", p."priceSufix", r."recipePhoto", r."recipePortions", 
    r."recipeTime", r."recipeDescription", r."recipePrivacity", r."createdAt" 
    FROM recipes r
    JOIN prices p ON p."priceId" = r."priceId" 
    JOIN dificults d ON d."dificultId" = r."recipeDificult"
    `);

    const [score] = await sequelize.query(`
    SELECT "recipeId", avg(s."recipeStartQuantity") as "score" 
    FROM stars s GROUP BY "recipeId"
    ORDER BY "score" DESC
    `);

    const recipes = recipe
      .map((r) => {
        score.find((s) =>
          s.recipeId === r.recipeId ? (r["score"] = s.score) : (r["score"] = 0)
        );
        return r;
      })
      .sort((a, b) => b.score - a.score);

    return res
      .status(200)
      .send(recipes.slice(page === 1 ? 0 : limit * (page - 1), limit * page));
  } catch (error) {
    return res.status(500).send({ message: `Algo ocurrio ${error}` });
  }
};

export const getFilterRecipes = async (req, res) => {
  let { search, category, ingredient, page, limit } = req.query;

  try {
    parseInt(limit);
    parseInt(page);
  } catch (error) {
    return error;
  }

  !limit ? (limit = 5) : limit;
  !page ? (page = 1) : page;
  category ? category.toLowerCase() : ''
  ingredient ? ingredient.toLowerCase() : ''
  search ? search.toLowerCase() : ''

  try {
    // GET score
    const [score] = await sequelize.query(`
    SELECT "recipeId", avg(s."recipeStartQuantity") as "score" 
    FROM stars s GROUP BY "recipeId"
    ORDER BY "score" DESC
    `);

    // GET categories
    const [categories] = await sequelize.query(`
    SELECT rc."recipeRecipeId", c."categoryId", c."categoryName" FROM recipe_categories rc  
    JOIN categories c ON rc."categoryCategoryId" = c."categoryId"
    `);

    // Get Steps
    const [steps] = await sequelize.query(`
    SELECT s."stepId", s."stepNumber", s."stepImage", s."stepDescription", s."createdAt" FROM step_recipes sr
    JOIN recipes r ON sr."recipeRecipeId" = r."recipeId"
    JOIN steps s ON sr."stepStepId" = s."stepId"
    WHERE sr."recipeRecipeId" = r."recipeId" ORDER BY s."stepNumber"
    `);

    // auxiliar variables
    const stepsId = [];

    // Create json step data
    steps.map(async (step) => {
      // send step id's for get all tools
      stepsId.push(step.stepId);
    });

    // get all ingredients on recipes
    const [allIngredients] = await sequelize.query(`
      SELECT i."ingredientId", r."recipeId", i."quantity", m."measureName", i."ingredientName" FROM step_ingredients si 
      JOIN ingredients i ON si."ingredientIngredientId" = i."ingredientId"
      JOIN measures m ON i."measureId" = m."measureId"
      JOIN step_recipes s ON s."stepStepId" = si."stepStepId"
      JOIN recipes r ON r."recipeId" = s."recipeRecipeId"
    `);

    // GET recipes
    const [recipe] = await sequelize.query(`
    SELECT r."recipeId", r."recipeName", d."dificultName", p."priceSufix", r."recipePhoto", r."recipePortions", 
    r."recipeTime", r."recipeDescription", r."recipePrivacity", r."createdAt"
    FROM recipes r
    JOIN prices p ON p."priceId" = r."priceId" 
    JOIN dificults d ON d."dificultId" = r."recipeDificult"
    `);


    const recipes = recipe
      .map((r) => {
        score.find((s) =>
          s.recipeId === r.recipeId ? (r["score"] = s.score) : (r["score"] = 0)
        );
        r["tags"] = categories
          .filter((c) => c.recipeRecipeId === r.recipeId)
          .map((e) => {
            delete e.recipeRecipeId;
            return e;
          });
        r["ingredients"] = allIngredients
          .filter((ing) => r.recipeId === ing.recipeId)
          .map((e) => {
            delete e.recipeId;
            return e;
          });
        return r;
      })
      .filter((recipe) => (
        recipe.recipeName.toLowerCase().includes(search)
        ||
        recipe.ingredients.some((ing) =>
          ing.ingredientName.toLowerCase().includes(search)
        )
        ||
        recipe.tags.some((tag) =>
          tag.categoryName.toLowerCase().includes(search)
        )
      )).filter(recipeFilt => {
        if (category) {
          return recipeFilt.tags.some((tag) =>
            tag.categoryName.toLowerCase().includes(search)
          )
        }
        else if (ingredient) {
          return recipeFilt.ingredients.some((ing) =>
          ing.ingredientName.toLowerCase().includes(search)
        )
        }else{
          return recipeFilt
        }
      })


    return res
      .status(200)
      .send(recipes.slice(page === 1 ? 0 : limit * (page - 1), limit * page));
  } catch (error) {
    return res.status(500).send({ message: `Algo ocurrio ${error}` });
  }
};

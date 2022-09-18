import { Stars } from "../../models/Stars.js";

export const getRecipeStarsById = async (req, res) => {
    try {
        const { recipe_id } = req.params

        if (!recipe_id) return res.status(400).send({ message: `Por favor enviar un id` })

        const stars = await Stars.findAll({ where: { recipeId: recipe_id } })

        if (!stars) return res.status(200).send({ message: `No se ecuentra la calificación con el id: ${recipe_id}` })

        if (stars) return res.status(200).send(stars)
    } catch (error) {
        return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
    }
}

export const createStars = async (req, res) => {
    try {
        const {
            userId,
            recipeId,
            recipeStartQuantity
        } = req.body

        if(!userId | !recipeId | !recipeStartQuantity) return res.status(400).send({ message: 'Por favor enviar todos los datos requeridos' })

        const recipe_stars = await Stars.findOne({ where: { userId: userId, recipeId: recipeId } })

        if (recipe_stars) return res.status(400).send({ message: 'Solo puede agregar una calificación por receta' })


        const newRecipeStar = await Stars.create({
            userId,
            recipeId,
            recipeStartQuantity
        })

        if (newRecipeStar) return res.status(200).send({ message: `Se ha calificado la receta: ${newRecipeStar.recipeStartQuantity}` })
    } catch (error) {
        return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
    }
}

export const updateStars = async (req, res) => {
    try {
        const { 
            recipe_id,
            user_id
         } = req.params

        if (!recipe_id | !user_id) return res.status(400).send({ message: `Por favor enviar id de receta y usuario` })

        const {
            recipeStartQuantity
        } = req.body

        const recipeStars = await Stars.update({
            recipeStartQuantity
        }, {
            where: {
                userId: user_id,
                recipeId: recipe_id
            }
        })

        if(!recipeStars) return res.status(400).send({ message: `No se ecuentra la receta con el id: ${recipe_id}`  })

        if(recipeStars) return res.status(200).send({ message: `La calificación a la receta se ha actualizado` })

    } catch (error) {
        return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
    }
}
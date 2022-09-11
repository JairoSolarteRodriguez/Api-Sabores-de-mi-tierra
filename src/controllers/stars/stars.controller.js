import { Stars } from "../../models/Stars.js";

export const getRecipeStarsById = async (req, res) => {
    try {
        const { recipe_id } = req.params

        if (!recipe_id) return res.status(400).send({ message: `Por favor enviar un id` })

        const stars = await Stars.findAll({ where: { recipe_id: recipe_id } })

        if (!stars) return res.status(200).send({ message: `No se ecuentra la calificación con el id: ${id}` })

        if (stars) return res.status(200).send(stars)
    } catch (error) {
        return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
    }
}

export const createStars = async (req, res) => {
    try {
        const {
            user_id,
            recipe_id,
            recipe_start_quantity
        } = req.body

        if(!user_id | !recipe_id | !recipe_start_quantity) return res.status(400).send({ message: 'Por favor enviar todos los datos requeridos' })

        const recipe_stars = await Stars.findOne({ where: { user_id: user_id, recipe_id: recipe_id } })

        console.log(recipe_stars)

        if (recipe_stars) return res.status(400).send({ message: 'Solo puede agregar una calificación por receta' })


        const newRecipeStar = await Stars.create({
            user_id,
            recipe_id,
            recipe_start_quantity
        })

        if (newRecipeStar) return res.status(200).send({ message: `Se ha calificado la receta: ${newRecipeStar.recipe_start_quantity}` })
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
            recipe_start_quantity
        } = req.body

        const recipeStars = await Stars.update({
            recipe_start_quantity
        }, {
            where: {
                user_id: user_id,
                recipe_id: recipe_id
            }
        })

        if(!recipeStars) return res.status(400).send({ message: `No se ecuentra la receta con el id: ${id}`  })

        if(recipeStars) return res.status(200).send({ message: `La calificación a la receta se ha actualizado` })

    } catch (error) {
        return res.status(500).send({ message: `Ha ocurrido un error: ${error}` })
    }
}
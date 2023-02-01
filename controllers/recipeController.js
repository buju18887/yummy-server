const asyncHandler = require('express-async-handler')

const Recipe = require('../models/recipeModel')
const User = require('../models/userModel')

const getRecipe = asyncHandler(async(req, res) => {
   const recipes = await Recipe.find({user: req.user.id})
   res.status(200).json(recipes)
})

const setRecipe = asyncHandler(async(req, res) => {
   const { recipe_name, description, prep_time, cook_time, servings, instructions, ingredients, tools} = req.body

   if( !recipe_name || !description || !prep_time || !cook_time || !servings || !instructions || !ingredients || !tools) {
    res.status(400)
    throw new Error('Please fill the required fields')
   }

   const recipe = await Recipe.create({
      recipe_name,
      description,
      prep_time,
      cook_time,
      servings,
      instructions,
      ingredients,
      tools,
      user: req.user.id
   })

   res.status(200).json(recipe)
})

const updateRecipe = asyncHandler(async(req, res) => {
   const recipe = await Recipe.findById(req.params.id)

   if(!recipe) {
    res.status(400)
    throw new Error('Recipe not found')
   }

   //checking user
   if(!req.user) {
    res.status(401)
    throw new Error('User not found')
   }

   //matching user if logged in
   if(recipe.user.toString() !== req.user.id) {
    res.status(400)
    throw new Error('User not authorized')
   }

   const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
   res.status(200).json(updatedRecipe)
})

const deleteRecipe = asyncHandler(async(req, res) => {
    const recipe = await Recipe.findById(req.params.id)

    if(!recipe) {
     res.status(400)
     throw new Error('Recipe not found')
    }
 
    //checking user
    if(!req.user) {
     res.status(401)
     throw new Error('User not found')
    }
 
    //matching user if logged in
    if(recipe.user.toString() !== req.user.id) {
     res.status(400)
     throw new Error('User not authorized')
    }

    await Recipe.remove(recipe)
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getRecipe,
    setRecipe,
    updateRecipe,
    deleteRecipe
}
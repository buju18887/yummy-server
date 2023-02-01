const express = require('express')
const { getRecipe, setRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipeController')
const router = express.Router()
const protect = require('../middleware/authMiddleware')

router.get('/', protect, getRecipe)

router.post('/', protect, setRecipe)

router.put('/:id', protect, updateRecipe)

router.delete('/:id', protect, deleteRecipe)

module.exports = router
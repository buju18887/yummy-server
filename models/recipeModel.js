const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    recipe_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }, 
    prep_time: {
        type: Number,
        required: true,
    },
    cook_time: {
        type: Number,
        required: true, 
    },
    servings: {
        type: Number,
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    ingredients: {
        type: String,
        required: true,
    },
    tools: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Recipe', recipeSchema)

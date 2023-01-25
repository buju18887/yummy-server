const express = require('express');
const ensureAuthenticated = require('../authenticator/auth');
const router = express.Router();
const {Recipes, User} = require('../database/database');

router.use(ensureAuthenticated)

router.get('/', (req, res) => {
    res.render('dashboard')
});

router.get('/single_recipe', (req, res) => {
    res.render('single-recipe')
})

router.get('/drinks', (req, res) => {
    res.render('drinks')
});

router.get('/create_recipe', (req, res) => {
    res.render('create-recipe')
});

router.post('/create_recipe', (req, res) => {
   const {recipe_img, recipe_name, description, prep_time, cook_time, servings, instructions, ingredients, tools} = req.body;

   if(recipe_img, recipe_name, description, prep_time, cook_time, servings, instructions, ingredients, tools) {
     try {
       User.createRecipes({
        recipe_img: `${recipe_img}`,
        recipe_name: `${recipe_name}`,
        description: `${description}`,
        prep_time: `${prep_time}`,
        cook_time: `${cook_time}`,
        servings: `${servings}`,
        instructions: `${instructions}`,
        ingredients: `${ingredients}`,
        tools: `${tools}`
       })
     }
     catch(err) {
       console.log(err);
     }
   } else {
    err => console.log(err);
   }
})

module.exports = router;
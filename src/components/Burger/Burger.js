import React from 'react'

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = ( props ) => {
  // CREATE AN APPROPRIATE AMOUNT OF BURGER INGREDIENT COMPONENTS: call Object.keys method to convert the keys of a given object (state.ingredients properties in BurgerBuilder.js) into an array - an array of keys (which happen to be strings) -- then, I must first map throught the array of strings to transform the specific string value of an ingredient into an array that has as many elements as I have ingredients for that given ingredient (e.g.: 2 slices of cheese); then, I return JSX in-the-creation-of a new array (hence my use of the spread operator) with an array length of the given ingredient and map through this new array (the first element value is unimportant so I use an underscore as its argument, but the second element i is my index count) and the BurgerIngredient component will now include the creation of a unique key for each ingredient.   
  const transformedIngredients = Object.keys(props.ingredients)
    .map((ingKey) => {
      return [...Array(props.ingredients[ingKey])].map((_, i) => {
       return <BurgerIngredient key={ingKey + i} type={ingKey} />
      });
    });
  return(
   <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
   </div>
  );
};

export default burger;
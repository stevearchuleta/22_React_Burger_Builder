import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {
  // CREATE AN APPROPRIATE AMOUNT OF BURGER INGREDIENT COMPONENTS: call Object.keys method to convert the keys of a given object (state.ingredients properties in BurgerBuilder.js) into an array - an array of keys (which happen to be strings) -- then, I must first map through the array of strings to transform the specific string value of an ingredient into an array that has as many elements as I have ingredients for that given ingredient (e.g.: 2 slices of cheese); then, I return JSX in-the-creation-of a new array (hence my use of the spread operator) with an array length of the given ingredient and map through this new array (the first element value is unimportant so I use an underscore as its argument, but the second element i is my index count) and the BurgerIngredient component will now include the creation of a unique key for each ingredient.   
  console.log(props);
  let transformedIngredients = Object.keys( props.ingredients )
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />
      });
    } )
    // reduce automatically takes two arguments: previous value, current value.
    .reduce( (arr, el) => {
      return arr.concat(el)
    }, []);
    // console.log('[Burger.js]', transformedIngredients);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add ingredients.</p>
  }  
 
  return(
  <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
  </div>
  );
};

export default burger;